// Google Sheets configuration
export const GOOGLE_SHEETS_CONFIG = {
    spreadsheetId: process.env.GOOGLE_SHEET_ID || '15wL6CxVSo5cuxsQS9r3wcWQq6ySstPoGZR04paChoZ8',
    rsvpRange: 'myuser!A:G'
};

// Wedding configuration
export const WEDDING_CONFIG = {
    coupleNames: "Zayn & Nala",
    weddingDate: "July 15, 2026",
    locations: {
        ceremony: {
            name: "Masjid Al-Barakah",
            address: "Jl. Merdeka No. 123, Jakarta Selatan",
            mapUrl: "https://maps.app.goo.gl/xYvohTCoSD1wYzyH7"
        },
        reception: {
            name: "Ballroom Grand Hotel",
            address: "Jl. Sudirman No. 456, Jakarta Pusat",
            mapUrl: "https://maps.app.goo.gl/xYvohTCoSD1wYzyH7"
        }
    }
};