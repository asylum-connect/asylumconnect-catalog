import _forEach from 'lodash/forEach';

const propertyMap = {
  'additional-info': {
    'at-capacity': 'At capacity',
    'geo-near-public-transit': 'Near public transportation',
    'geo-public-transit-description': 'Transit details: [value]',
    'has-confidentiality-policy': 'Has a confidentiality policy',
    'time-walk-in': 'Walk-ins welcome',
  },
  community: {
    'community-adults': 'Adults (18+)',
    'community-africa-immigrant': 'African community',
    'community-african-american': 'African American community',
    'community-api': 'Asian/Pacific Islander community',
    'community-asylee': 'Asylum seekers',
    'community-daca-recipient-seeker': 'DACA Recipient Seeker',
    'community-detained-immigrant': 'Detained Immigrants',
    'community-disabled': 'People with disabilities',
    'community-hiv-aids': 'Individuals with HIV/AIDS',
    'community-homeless': 'Homeless individuals',
    'community-human-trafficking-survivor': 'Human Trafficking survivors',
    'community-latin-america-immigrant': 'Latin American community',
    'community-latino': 'Latino community',
    'community-lgbtq-youth': 'LGBTQ Youth',
    'community-middle-east-immigrant': 'Middle East community',
    'community-muslim': 'Muslim community',
    'community-native-american': 'Native American community',
    'community-refugee': 'Refugees',
    'community-russia-immigrant': 'Russian community',
    'community-seniors': 'Seniors',
    'community-teens': 'Teens',
    'community-transgender':
      'Transgender, non-binary and gender non-conforming community',
    'community-undocumented': 'Undocumented community',
  },
  cost: {
    'cost-fees': 'Costs: [value]',
    'cost-free': 'Free of cost',
  },
  eligibility: {
    'elig-age-or-over': 'Ages [value] and over',
    'elig-age-or-under': 'Ages [value] and under',
    'elig-age-range': 'Ages [value]',
    'elig-description': '[value]',
    'time-appointment-required': 'Appointment Required',
  },
  language: {
    'lang-american-sign-language': {name: 'American Sign Language'},
    'lang-all-languages-by-interpreter': '[value]',
    'lang-albanian': {code: 'sq'},
    'lang-amharic': {code: 'am'},
    'lang-arabic': {code: 'ar'},
    'lang-armenian': {code: 'hy'},
    'lang-bangali': {code: 'bn'},
    'lang-berber': {name: 'Berber'},
    'lang-bhutanese': {code: 'dz'},
    'lang-bosnian': {code: 'bs'},
    'lang-bulgarian': {code: 'bg'},
    'lang-burmese': {code: 'my'},
    'lang-cambodian': {code: 'km'},
    'lang-cantonese': {name: 'Cantonese'},
    'lang-cebuano': {name: 'Cebuano'},
    'lang-chin': {name: 'Chin'},
    'lang-chiu-chow': {name: 'Chiuchow'},
    'lang-creole': {name: 'Creole'},
    'lang-croatian': {code: 'hr'},
    'lang-dari': {name: 'Dari'},
    'lang-dinka': {name: 'Dinka'},
    'lang-eritrean': {code: 'aa'},
    'lang-farsi': {code: 'fa'},
    'lang-fiji': {code: 'fj'},
    'lang-french': {code: 'fr'},
    'lang-fukinese': {name: 'Fukinese'},
    'lang-indonesian': {code: 'id'},
    'lang-german': {code: 'de'},
    'lang-greek': {code: 'el'},
    'lang-gujarati': {name: 'Gujarati'},
    'lang-hebrew': {code: 'he'},
    'lang-hindi': {code: 'hi'},
    'lang-hmong': {name: 'Hmong'},
    'lang-hunan': {name: 'Hunan'},
    'lang-hungarian': {code: 'hu'},
    'lang-ilocano': {name: 'Iloko'},
    'lang-italian': {code: 'it'},
    'lang-japanese': {code: 'ja'},
    'lang-karen': {name: 'Karen'},
    'lang-karenni': {name: 'Karenni'},
    'lang-katchi': {name: 'Katchi'},
    'lang-khmer': {code: 'km'},
    'lang-kirundi': {name: 'Kirundi'},
    'lang-kiswahili': {name: 'Kiswahili'},
    'lang-korean': {code: 'ko'},
    'lang-kurdish': {code: 'ku'},
    'lang-kurmanji': {name: 'Kurmanji'},
    'lang-laotian': {code: 'lo'},
    'lang-lingala': {code: 'ln'},
    'lang-mam': {name: 'Mayan (Mam)'},
    'lang-mandarin': {code: 'zh'},
    'lang-mandingo': {name: 'Mandingo'},
    'lang-marathi': {code: 'mr'},
    'lang-mien': {name: 'Mien'},
    'lang-mongolian': {code: 'mn'},
    'lang-nepali': {code: 'ne'},
    'lang-pashtu': {code: 'ps'},
    'lang-polish': {code: 'pl'},
    'lang-portuguese': {code: 'pt'},
    'lang-punjabi': {code: 'pa'},
    'lang-quechua': {code: 'qu'},
    'lang-romanian': {code: 'ro'},
    'lang-russian': {code: 'ru'},
    'lang-samoan': {code: 'sm'},
    'lang-senufu': {name: 'Senufo'},
    'lang-serbian': {code: 'sr'},
    'lang-sinhala': {code: 'si'},
    'lang-somali': {code: 'so'},
    'lang-spanish': {code: 'es'},
    'lang-tagalog': {code: 'tl'},
    'lang-taiwanese': {name: 'Taiwanese'},
    'lang-tamil': {code: 'ta'},
    'lang-telugu': {code: 'te'},
    'lang-thai': {code: 'th'},
    'lang-tibetan': {code: 'bo'},
    'lang-tigrigna': {code: 'ti'},
    'lang-tigrinya': {code: 'ti'},
    'lang-toisanese': {name: 'Toisanese'},
    'lang-tongan': {code: 'to'},
    'lang-turkish': {code: 'tr'},
    'lang-twi': {code: 'tw'},
    'lang-ukrainian': {code: 'uk'},
    'lang-urdu': {code: 'ur'},
    'lang-vietnamese': {code: 'vi'},
    'lang-wolof': {code: 'wo'},
  },
  required: {
    'req-medical-insurance': 'Medical insurance',
    'req-photo-id': 'A photo ID',
    'req-proof-of-age': 'Proof of age',
    'req-proof-of-income': 'Proof of income',
    'req-proof-of-residence': 'Proof of residence',
    'req-referral': 'A referral',
  },
};

export default propertyMap;

export const propertyMapKeys = Object.keys(propertyMap).reduce(
  (result, key, index) => {
    const properties = propertyMap[key];

    result[key] = Object.keys(properties);

    return result;
  },
  {}
);

/**
 * Combine a list of properties
 * @param  {Array[]} list list of properties
 * @return {Object} An object of all of the properties
 */
export const combineProperties = (list) => {
  return (
    list?.reduce((result, item) => {
      if (item?.properties) {
        return {...result, ...item.properties};
      }

      return result;
    }, {}) || {}
  );
};

/**
 * Seperate the properties by the corresponding type in the propertyMap
 * @param  {Object} properties List of properties
 * @return {} Properties seperated into their correct type
 */
export const seperatePropsByType = (properties) => {
  const result = {};

  _forEach(propertyMapKeys, (mapValues, mapKey) => {
    _forEach(properties, (propValue, propKey) => {
      if (mapValues.indexOf(propKey) !== -1) {
        if (!result[mapKey]) {
          result[mapKey] = [];
        }

        result[mapKey].push({
          key: propKey,
          slug: propKey,
          text: propertyMap[mapKey][propKey],
          value: propValue,
        });
      }
    });
  });

  return result;
};