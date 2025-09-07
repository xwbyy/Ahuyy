import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load configuration from set.json
const config = JSON.parse(fs.readFileSync('./set.json', 'utf8'));

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Google Sheets setup
let auth;
let sheets;
let isSheetsInitialized = false;

async function initializeSheets() {
  try {
    const privateKey = config.GOOGLE_PRIVATE_KEY;
    const clientEmail = config.GOOGLE_CLIENT_EMAIL;
    
    if (!privateKey || !clientEmail) {
      console.error('❌ Konfigurasi Google Sheets tidak lengkap');
      isSheetsInitialized = false;
      return;
    }

    auth = new google.auth.GoogleAuth({
      credentials: {
        type: "service_account",
        project_id: config.GOOGLE_PROJECT_ID,
        private_key_id: config.GOOGLE_PRIVATE_KEY_ID,
        private_key: privateKey,
        client_email: clientEmail,
        client_id: "102190198674035043299",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${encodeURIComponent(clientEmail)}`,
        universe_domain: "googleapis.com"
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const authClient = await auth.getClient();
    sheets = google.sheets({ version: 'v4', auth: authClient });
    
    // Test connection
    await sheets.spreadsheets.values.get({
      spreadsheetId: config.GOOGLE_SHEET_ID,
      range: 'myuser!A1:A1',
    });
    
    isSheetsInitialized = true;
    console.log('✅ Terhubung ke Google Sheets API');
  } catch (err) {
    console.error('❌ Error menginisialisasi Google Sheets API:', err.message);
    isSheetsInitialized = false;
  }
}

// Initialize sheets when server starts
initializeSheets().catch(console.error);

function checkSheetsInitialized(req, res, next) {
    if (!isSheetsInitialized) {
        return res.status(503).json({ 
            error: 'Layanan sementara tidak tersedia. Google Sheets belum diinisialisasi.' 
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
            spreadsheetId: config.GOOGLE_SHEET_ID,
            range: 'myuser!A:D',
            valueInputOption: 'RAW',
            insertDataOption: 'INSERT_ROWS',
            resource: {
                values: [[
                    name,
                    attendance === 'yes' ? 'Akan Hadir' : 'Tidak Hadir',
                    message || '',
                    new Date().toLocaleString('id-ID')
                ]]
            }
        });
        
        res.json({ success: true });
    } catch (err) {
        console.error('❌ Error menyimpan RSVP:', err.message);
        res.status(500).json({ error: 'Gagal menyimpan RSVP. Silakan coba lagi.' });
    }
});

app.get('/api/responses', checkSheetsInitialized, async (req, res) => {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: config.GOOGLE_SHEET_ID,
            range: 'myuser!A:D',
        });

        const rows = response.data.values || [];
        // Skip header row if it exists
        const startRow = rows[0] && (rows[0][0] === 'Name' || rows[0][0] === 'Nama') ? 1 : 0;
        
        const responses = rows.slice(startRow).map(row => ({
            name: row[0] || '',
            attendance: row[1] || '',
            message: row[2] || '',
            timestamp: row[3] || ''
        }));

        res.json(responses);
    } catch (err) {
        console.error('❌ Error mengambil respons:', err.message);
        res.status(500).json({ error: 'Gagal mengambil respons. Silakan coba lagi.' });
    }
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        sheetsInitialized: isSheetsInitialized,
        timestamp: new Date().toISOString()
    });
});

// Serve static files
app.use(express.static('public'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((err, req, res, next) => {
    console.error('❌ Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
    console.log(`🚀 Server berjalan di port ${port}`);
});

// Reconnect to Google Sheets API every 30 seconds if not initialized
setInterval(async () => {
    if (!isSheetsInitialized) {
        console.log('Mencoba menyambung kembali ke Google Sheets API...');
        await initializeSheets();
    }
}, 30000);