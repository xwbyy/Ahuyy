import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cek & load set.json
const configPath = path.join(__dirname, 'set.json');
if (!fs.existsSync(configPath)) {
  console.error(`❌ File set.json tidak ditemukan di ${configPath}`);
  process.exit(1);
}
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

let sheets, isSheetsInitialized = false;

async function initializeSheets() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: "service_account",
        project_id: config.GOOGLE_PROJECT_ID,
        private_key_id: config.GOOGLE_PRIVATE_KEY_ID,
        private_key: config.GOOGLE_PRIVATE_KEY,
        client_email: config.GOOGLE_CLIENT_EMAIL
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const authClient = await auth.getClient();
    sheets = google.sheets({ version: 'v4', auth: authClient });

    await sheets.spreadsheets.values.get({
      spreadsheetId: config.GOOGLE_SHEET_ID,
      range: 'myuser!A1:A1',
    });

    isSheetsInitialized = true;
    console.log('✅ Google Sheets terhubung');
  } catch (err) {
    console.error('❌ Gagal konek Google Sheets:', err.message);
    isSheetsInitialized = false;
  }
}

initializeSheets();

function checkSheets(req, res, next) {
  if (!isSheetsInitialized) {
    return res.status(503).json({ error: 'Google Sheets belum siap' });
  }
  next();
}

app.post('/api/rsvp', checkSheets, async (req, res) => {
  try {
    const { name, attendance, message } = req.body;
    if (!name || !attendance) return res.status(400).json({ error: 'Nama & Kehadiran wajib diisi' });

    await sheets.spreadsheets.values.append({
      spreadsheetId: config.GOOGLE_SHEET_ID,
      range: 'myuser!A:D',
      valueInputOption: 'RAW',
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
    console.error('❌ Error simpan RSVP:', err.message);
    res.status(500).json({ error: 'Gagal simpan RSVP' });
  }
});

app.get('/api/responses', checkSheets, async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: config.GOOGLE_SHEET_ID,
      range: 'myuser!A:D',
    });
    const rows = response.data.values || [];
    const start = rows[0] && (rows[0][0] === 'Name' || rows[0][0] === 'Nama') ? 1 : 0;
    res.json(rows.slice(start).map(r => ({
      name: r[0] || '',
      attendance: r[1] || '',
      message: r[2] || '',
      timestamp: r[3] || ''
    })));
  } catch (err) {
    console.error('❌ Error ambil data:', err.message);
    res.status(500).json({ error: 'Gagal ambil data' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', sheetsInitialized: isSheetsInitialized, timestamp: new Date().toISOString() });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => console.log(`🚀 Server jalan di port ${port}`));

setInterval(() => { if (!isSheetsInitialized) initializeSheets(); }, 30000);