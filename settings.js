// Google Sheets configuration
export const GOOGLE_SHEETS_CONFIG = {
    spreadsheetId: '1RnoMuiqAh-87-Be7n7pAJGwaBoMgwYBhdzt_pA7gLPk',
    rsvpRange: 'nikah', // Sheet name
    serviceAccount: {
        type: "service_account",
        project_id: "daniel136",
        private_key_id: "96b25ab3b1d870db38cd9d5d17ab93a38b423eee",
        private_key: `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCrMnVriT5nJWyO
TEP83ZZ320cPc+gjpCktB2m5C7nckfbvvPGd0qjY5hEXztB98rzfKNKZD3aFI0y4
BwRo4w1IzFUSkymfrO1JL4UeOUe+nQv02BL7UyEXD7E4/fLGSEPRfbo3ScsCBMo2
oIXzvYGIZJfB5I0WXgIODtALXaerytL1ngOEDaurIsuSqdFJ8T40Te+20Tymrygu
Ht7ymAnxKuin9rcVN5AfVBhywVDX+ERMipTCdYT+YOZX5DOKYu+96vB7uyTvPKPd
58EwtwPRGSqduu7EwVUJhIvuUQaveHppWEW7jTY1cO2603Yl1BefoNIt1dBb7LbF
49qdOFE7AgMBAAECggEAEAxVXITLkEC+WeKFVw1wnwCzuxua7chkQb/ZpcqXHDmk
o9ma7rgCMv7yKECvY7cfBG5fu5BrBFUISpIB1FFAfAwHh4u7EahUwBEP0gL9mj0/
ky60LNIgnnhOnTCVEwhQLzGxhKBKwwAu8or+s5gWrfH8FeV2Ylvipm22C/K2FpDv
64wyKeFT5sFmAdoZORu0Y/7NRQ9Eyhk4fOg8N03ktAu/WOW1YSt8KkQAQIHd6YIg
fyKYsUe9k7DiHT1DZ7QwPAnfxnB2bWkxnRlf/8/Mor5rs7K8iHarFdv3nPjiTVH/
YDp+q8SECiyiltYfvdI0D97nFOqtOK7OmtA70LmgwQKBgQDkK0VJQl/IpPgZwrhm
36eXiwJ6t2T4ThJ3B+5RxBZ7h9agU3nTUfBlD/OsBg2bu3q36Szv3YOTxvTepR8Z
5oMdpV2LnHfwymKirpk30sBEnDeBo2pVCHM+XjcbcbexSgRd1aAqHFaTkRh59EnC
sPVOFyBZP2CApCckSlzeQs5QQQKBgQDAFDOx5ga8ic+ScfOpqWZnRddVFZGmvBP9
YRS7SbZKGI3Kqv4Y1a5UTY/yj2h/EgeUi2gm86L2bZhAB/guf1NlKTHqSV2Lcq+q
tQwcRF2x6XonZljXcMpeEdRY7MEIoazWVS2EeUPaTiTKjfuU/3zuEyO81yIR1/tF
3frCuadCewKBgQDeoiYSDJS/h9CZ+jjKEFNL+BSsPwRjkHJN+MwetnGliW7vs2P8
wUgKpJ0D7kga+70LdJcnWYJIkGpgUMffEuA+7hsv3bXemuvRhwHzyU1X5QH4Gcbo
P72LTo0A114AvJM0J/0G+e20QXCblrTeJqLE1qX2z3NPMl0K+RBSwubiwQKBgCYB
GUVetQCC5+4a29I68UcHu5ZbISlzVyUwGzD/YbEBcLSj5oi1ZrvJaOzeURerUpKi
jqX+WMUXZCNvMDzK9o4ye2zWvUqFE5rcHZxOLpewEXpQNs3RxEiekHxTw9HYY2E5
Ezt93t4HziHBvAB8GJTmdpC7pEMRj+cAB8iVgTGXAoGAPklvxGp56KQdxvEHRk+4
QBX+g+Hw+tNVqzKVxPPCpOve/2ScOiVr/3PGWMNd2HeIzIWHVfZXWyETkwWiqmtL
378u2pFNh6FaxZFbFObZjyPKYr/aWSd8fmy0v/NeNDz2+oL4n1D1DNXu6T2D2kQy
SNW2o4UK3JmkBY25rIKqfC0=
-----END PRIVATE KEY-----`,
        client_email: "daniel166@daniel136.iam.gserviceaccount.com",
        client_id: "117950866995283381514",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/daniel166%40daniel136.iam.gserviceaccount.com"
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