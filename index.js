import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Google Sheets setup
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, 'credentials.json'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const spreadsheetId = '15wL6CxVSo5cuxsQS9r3wcWQq6ySstPoGZR04paChoZ8';
const range = 'dataku!A:G';

let sheets;
let isSheetsInitialized = false;

async function initializeSheets() {
  try {
    const authClient = await auth.getClient();
    sheets = google.sheets({ version: 'v4', auth: authClient });
    
    // Test connection
    await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'dataku!A1:A1',
    });
    
    isSheetsInitialized = true;
    console.log('✅ Connected to Google Sheets API');
  } catch (err) {
    console.error('❌ Error initializing Google Sheets API:', err.message);
    isSheetsInitialized = false;
  }
}

// Initialize sheets when server starts
initializeSheets().catch(console.error);

function checkSheetsInitialized(req, res, next) {
    if (!isSheetsInitialized) {
        return res.status(503).json({ 
            error: 'Service temporarily unavailable. Google Sheets not initialized.' 
        });
    }
    next();
}

app.post('/api/rsvp', checkSheetsInitialized, async (req, res) => {
    try {
        const { name, email, age, address, attendance, message } = req.body;
        
        if (!name || !email || !age || !address || !attendance) {
            return res.status(400).json({ error: 'Semua field harus diisi' });
        }
        
        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: 'RAW',
            insertDataOption: 'INSERT_ROWS',
            resource: {
                values: [[
                    name,
                    email,
                    age,
                    address,
                    attendance === 'yes' ? 'Akan Hadir' : 'Tidak Hadir',
                    message || '',
                    new Date().toISOString()
                ]]
            }
        });
        
        res.json({ success: true });
    } catch (err) {
        console.error('❌ Error saving RSVP:', err.message);
        if (err.message.includes('invalid_grant')) {
            await initializeSheets();
        }
        res.status(500).json({ error: 'Failed to save RSVP. Please try again.' });
    }
});

app.get('/api/responses', checkSheetsInitialized, async (req, res) => {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        const rows = response.data.values || [];
        // Skip header row if it exists
        const startRow = rows[0] && rows[0][0] === 'Name' ? 1 : 0;
        
        const responses = rows.slice(startRow).map(row => ({
            name: row[0] || '',
            email: row[1] || '',
            age: row[2] || '',
            address: row[3] || '',
            attendance: row[4] || '',
            message: row[5] || '',
            timestamp: row[6] || ''
        }));

        res.json(responses);
    } catch (err) {
        console.error('❌ Error getting responses:', err.message);
        if (err.message.includes('invalid_grant')) {
            await initializeSheets();
        }
        res.status(500).json({ error: 'Failed to get responses. Please try again.' });
    }
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        sheetsInitialized: isSheetsInitialized,
        timestamp: new Date().toISOString()
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((err, req, res, next) => {
    console.error('❌ Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});

// Reconnect to Google Sheets API every 30 seconds if not initialized
setInterval(async () => {
    if (!isSheetsInitialized) {
        console.log('Attempting to reconnect to Google Sheets API...');
        await initializeSheets();
    }
}, 30000);