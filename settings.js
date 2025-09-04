// Google Sheets configuration
export const GOOGLE_SHEETS_CONFIG = {
    spreadsheetId: '15wL6CxVSo5cuxsQS9r3wcWQq6ySstPoGZR04paChoZ8',
    rsvpRange: 'dataku!A:G',
    serviceAccount: {
        type: "service_account",
        project_id: "studious-nature-470917-r6",
        private_key_id: "feef8814243d8b3221949dd2b5ac4f167a9f5ce4",
        private_key: process.env.GOOGLE_PRIVATE_KEY || `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCzaGuPstxwSsvQ
v54kCqSAzJ0CvC7dnj5F4Qs337O9ZrEhSFzLUw2gYtVsfmUPwp3ScAuPpMoSq+O5
XwxNuHR99BOxfrchtUmGbBNh0pCx02EemHbmCOZU9F59oXOqCCZaDwf0xp341/Qt
vG1+uY2TaRXRaWr9X7A0Oi5sZgGWI6BODPKcdiex6Zdl2exXdFeAOSl0/XE5ImZZ
EHvb2mdB2DZrd8QAkwWCAHRIAnpaxhnai5ur5N4FID8GqB29taFbUAQe8lL4E55v
dvZV8zr3CMdIbZGmtiS6gzdQBi3KNTjphg3I3qRXuEyjZ+3P9XUEhIq3h5KqiPMy
x5kWB0NfAgMBAAECggEAAjR+2fHLVs/8iFDKm0vMMM8TAPUaKFwpDMfS0Pl9Zo8M
D0op5c/cA4QjdmVpTZPJR8xbwAS4/RjCwEUETDI/sEqfMVfK3W2yfSX36QRjBeSA
tZUPJQ2n8xRb0vR4jPbzrbiwktgcGfJhjGxb9ipGrLCmdX/zsjCKZGHwryFj1JoP
LkckHNPVyCFKU+PTf31Wk1U23BIaKnbpNkKawYqNtZTySxNsO5SjK42pnQxqQ7nA
+62UNAudkKc8RdobQVhK4NozIzn0TuHBMiu037VmdiFXbHfXbY5fCXqOvUxJjQgO
8u9lu3trgsa1XXIaOrqZhmYycnYXqt7FPVa9+Z3I1QKBgQD0wgsQ7gWHWHyIlPAC
zJM8ZJ/yR/XP3bLGzblrV4uGY0mvJymKLqNdiaf8FmaquOyYBt+scNnBKbZzD7yU
6MKsKtL54Jm6eBrzMBIxIYQPRYwC1rNtLG6t/mpr0aNd+zImWSeFEtJob7piGcUy
B1xbQVz4KVpCTch2QdfmKkjhLQKBgQC7pfdFAjNpiY1UXDoJip0SoZ/UFgAWIgvF
8g18NbWcp68k5V5+yOtx4YQdtVV5darhgsSaVaN4TWnR+ajrDViWbztqFpcJDvfZ
g2/hMxNtT/sU6XWHCGgCnvyZUyeWV3qTwf9Lke1ofzO9rT3Fh9FunokIGLtWGEhR
rv7asVeWOwKBgQDjvi632RKR5rcyC4vsvth9yI+/zE+g1IRGUiSnCfXM3VQxw3n2
lwDxx2Xkvh9X2exkZXj5JqSoBR08oTbzREXoF4zqb5/7j0hcYq16w9nyr97gwVCB
VGfERMhXfODLUTJP1oNcYrAf915xa9M+gvTgAMj2LNxMd74As7Gl/FCGHQKBgC3n
S7X18929aHVamlf7MLF+GDspppvDeF3T+LiJ6wOHgbDk61jYjcAuCsO5uE8eGc9Q
zgdzK6oiReC30jqt6R3j2AT7wbbVkowDOzs742S6TBGxiq6dv9PkUKaxUN3WSIYc
zvcNm6YUd/POjW3k67bD0YHJiwpkpkxVIsMc3vBBAoGAM81NwpEMDgS0VZBqRIYD
xPSc5maLfPixAXR9BUsi0byM0iXQaFXftw8ewwsb0+xqCNt4DvpUHbPvlsXCKBVk
LHUrgUnYrLUBlQKedRQIaDZGR3pgcLsHPDa7wGZydyWCx2J1Lt5sofemWsBe8ibg
TfRduQSwPtlCUmwcBC7gj8Q=
-----END PRIVATE KEY-----`,
        client_email: "xwbygood@studious-nature-470917-r6.iam.gserviceaccount.com",
        client_id: "102190198674035043299",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/xwbygood%40studious-nature-470917-r6.iam.gserviceaccount.com",
        universe_domain: "googleapis.com"
    }
};

// Wedding configuration
export const WEDDING_CONFIG = {
    coupleNames: "Zayn & Nala",
    weddingDate: "July 15, 2023",
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