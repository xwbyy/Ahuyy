import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';
import { GOOGLE_SHEETS_CONFIG } from './settings.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Google Sheets setup
const auth = new google.auth.GoogleAuth({
    credentials: GOOGLE_SHEETS_CONFIG.serviceAccount,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

let sheets;
let isSheetsInitialized = false;

async function initializeSheets() {
    try {
        const authClient = await auth.getClient();
        sheets = google.sheets({ version: 'v4', auth: authClient });
        isSheetsInitialized = true;
        console.log('✅ Connected to Google Sheets API');
    } catch (err) {
        console.error('❌ Error initializing Google Sheets API:', err.message);
        isSheetsInitialized = false;
    }
}

await initializeSheets();

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
        const { name, attendance, message } = req.body;
        
        if (!name || !attendance) {
            return res.status(400).json({ error: 'Nama dan konfirmasi kehadiran harus diisi' });
        }
        
        await sheets.spreadsheets.values.append({
            spreadsheetId: GOOGLE_SHEETS_CONFIG.spreadsheetId,
            range: GOOGLE_SHEETS_CONFIG.rsvpRange,
            valueInputOption: 'RAW',
            resource: {
                values: [[
                    name,
                    attendance === 'yes' ? 'Akan Hadir' : 'Tidak Hadir',
                    message || '',
                    new Date().toISOString()
                ]]
            }
        });
        
        res.json({ success: true });
    } catch (err) {
        console.error('❌ Error saving RSVP:', err.message);
        if (err.message.includes('undefined') || err.message.includes('sheets.spreadsheets')) {
            await initializeSheets();
        }
        res.status(500).json({ error: 'Failed to save RSVP. Please try again.' });
    }
});

app.get('/api/responses', checkSheetsInitialized, async (req, res) => {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: GOOGLE_SHEETS_CONFIG.spreadsheetId,
            range: GOOGLE_SHEETS_CONFIG.rsvpRange,
        });

        const rows = response.data.values || [];
        const startRow = rows[0]?.[0] === 'Name' ? 1 : 0;
        
        const responses = rows.slice(startRow).map(row => ({
            name: row[0] || '',
            attendance: row[1] || '',
            message: row[2] || '',
            timestamp: row[3] || new Date().toISOString()
        }));

        res.json(responses);
    } catch (err) {
        console.error('❌ Error getting responses:', err.message);
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

setInterval(async () => {
    if (!isSheetsInitialized) await initializeSheets();
}, 30000);