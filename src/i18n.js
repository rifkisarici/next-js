import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations: {
                'Home': "Home",
                'Sign Up': 'Sign Up',
                'Candidate Sign Up': 'Candidate Sign Up',
                'Employer Sign Up': 'Employer Sign Up',
                'Password mismatch': 'Password mismatch',
                'Password': 'Password',
                'Full Time': 'Full Time',
                'Post a new job': 'Post a new job',
                'Jobs View': 'Jobs View',
                'Log In': 'Log In',
                "Update_Resume":"Update Resume",
                "Resume":"Resume",
                "Download_Resume":"Download Resume",
                "Settings":"Settings",
                "Education":"Education",
                "Education_Level":"Education Level",
                "University":"University",
                "Department_Names":"Department Names",
                "StarDateAndEndDateFail":"second date cannot be earlier than first date",
                must_not_be_empty:"must not be empty",
            }
        },
        tr: {
            translations: {
                'Home': "Ana Sayfa",
                'Sign Up': 'Kayıt Ol',
                'Candidate Sign Up': 'Aday Kayıt',
                'Employer Sign Up': 'İşveren Kayıt',
                'Password mismatch': 'Aynı şifreyi giriniz',
                'Password': 'Şifre',
                'Full Time': 'Tam Zamanlı',
                'Post a new job': 'Yenİ İlan',
                'Jobs View': 'Görüntülenme',
                'Log In': 'Gİrİş Yap',
                "Update_Resume":"Özgeçmiş Güncelle",
                "Resume":"Özgeçmiş",
                "Download_Resume":"Özgeçmiş İndİr",
                "Settings":"Ayarlar",
                "Education":"Eğitim",
                "Education_Level":"Eğitim Durumu",
                "University":"Üniversite",
                "Department_Names":"Bölüm",
                "StarDateAndEndDateFail":"ikinci tarih, ilk tarihten önce olamaz",
                must_not_be_empty:"boş bırakılamaz",
                
            }
        }
    },

    fallbackLng: 'tr',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
        escapeValue: false,
        formatSeparator: ','
    },
    react: {
        wait: true
    }
});
export default i18n;