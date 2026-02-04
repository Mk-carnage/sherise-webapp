import { useApp } from '@/contexts/AppContext';
import { translations, TranslationKey, Language } from '@/i18n/translations';

export function useTranslation() {
  const { language } = useApp();
  
  const t = (key: TranslationKey): string => {
    const lang = language as Language;
    const validLang = lang in translations ? lang : 'en';
    return translations[validLang][key] || translations.en[key] || key;
  };

  return { t, language };
}
