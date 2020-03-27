const enUS = {};

const enCA = {
  'Start typing address, city or zip code in the US…':
    'Start typing address, city or postal code in Canada…',
  'Download Legal Guides on LGBTQ Asylum in the U.S.':
    'Download Legal Guides on LGBTQ Asylum in Canada',
  'English classes': 'Language classes',
  'LGBTQ centers': 'LGBTQ centres',
  'Cultural centers': 'Cultural centres',
  'Drop-in centers for LGBTQ youth': 'Drop-in centres for LGBTQ youth',
  'Welcome to the United States AsylumConnect Catalog!':
    'Welcome to the Canada AsylumConnect Catalog!',
  'Physical evaluations for asylum claim':
    'Physical evaluations for refugee claim',
  'Asylum application': 'Refugee claim',
  'Psychological evaluations for asylum claim':
    'Psychological evaluations for refugee claim',
  'Career counseling': 'Career counselling',
  'Private therapy and counseling': 'Private therapy and counselling',
  '39.8333333': '60.8545463',
  '-98.585522': '-98.585522'
};

export const fetchLocale = locale => {
  switch (locale) {
    case 'en_CA':
      return enCA;
    case 'en_US':
    default:
      return enUS;
  }
};

export const validLocales = ['en_US', 'en_CA'];

export default {
  isLocaleSet: () => {
    return window.localStorage.getItem('locale');
  },
  getLocale: () => {
    return window.localStorage.getItem('locale') || 'en_US';
  },
  setLocale: locale => {
    window.localStorage.setItem('locale', locale);
  },
  clearLocale: () => {
    window.localStorage.removeItem('locale');
  }
};