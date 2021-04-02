
const translations = {
  1: {
    name: $localize `Vehicle`,
    'name-plural': $localize `Vehicles`,
    'new-item': $localize `New vehicle`,
    'add-sub-item': $localize `Add sub-vehicle`,
  },
  2: {
    name: $localize `Engine`,
    'name-plural': $localize `Engines`,
    'new-item': $localize `New engine`,
    'add-sub-item': $localize `Add sub-engine`,
  },
  3: {
    name: $localize `Category`,
    'name-plural': $localize `Categories`,
    'new-item': $localize `New category`,
    'add-sub-item': $localize `Add sub-category`,
  },
  4: {
    name: $localize `Twins`,
    'name-plural': $localize `Twins`,
    'new-item': $localize `New twins group`,
    'add-sub-item': $localize `Add sub-twins`,
  },
  5: {
    name: $localize `Brand`,
    'name-plural': $localize `Brands`,
    'new-item': $localize `New brand`,
    'add-sub-item': $localize `Add sub-brand`,
  },
  6: {
    name: $localize `Factory`,
    'name-plural': $localize `Factories`,
    'new-item': $localize `New factory`,
    'add-sub-item': $localize `Add sub-factory`,
  },
  7: {
    name: $localize `Museum`,
    'name-plural': $localize `Museums`,
    'new-item': $localize `New museum`,
    'add-sub-item': $localize `Add sub-museum`,
  },
  8: {
    name: $localize `Person`,
    'name-plural': $localize `Persons`,
    'new-item': $localize `New person`,
    'add-sub-item': $localize `Add sub-person`,
  },
  9: {
    name: $localize `Copyright block`,
    'new-item': $localize `New copyright block`,
    'name-plural': $localize `Copyright blocks`,
    'add-sub-item': $localize `Add sub copyright block`,
  }
};

const units = {
  1: {
    abbr: $localize `mm`,
    name: $localize `millimeter`,
  },
  2: {
    abbr: $localize `kg`,
    name: $localize `kilogram`,
  },
  3: {
    abbr: $localize `m`,
    name: $localize `meter`,
  },
  4: {
    abbr: $localize `cc`,
    name: $localize `cubic centimeter`,
  },
  5: {
    abbr: $localize `hp`,
    name: $localize `horsepower`,
  },
  6: {
    abbr: $localize `rpm`,
    name: $localize `rotates per minute`,
  },
  7: {
    abbr: $localize `Nm`,
    name: $localize `Newton-meter`,
  },
  8: {
    abbr: $localize `km/h`,
    name: $localize `kilometers per hour`,
  },
  9: {
    abbr: $localize `s`,
    name: $localize `seconds`,
  },
  10: {
    abbr: $localize `%`,
    name: $localize `percent`,
  },
  11: {
    abbr: $localize `°`,
    name: $localize `degree`,
  },
  12: {
    abbr: $localize `l`,
    name: $localize `liter`,
  },
  13: {
    abbr: $localize `l/100km`,
    name: $localize `liters per 100 kilometers`,
  },
  14: {
    abbr: $localize `CO2 g/km`,
    name: $localize `grams of CO2 per kilometer`,
  },
  15: {
    abbr: $localize `″`,
    name: $localize `inch`,
  },
  16: {
    abbr: $localize `y.`,
    name: $localize `year`,
  },
  17: {
    abbr: $localize `PS`,
    name: $localize `Pferdestärke`,
  },
  18: {
    abbr: $localize `kW`,
    name: $localize `kilowatt`,
  },
  19: {
    abbr: $localize `V`,
    name: $localize `volt`,
  },
  20: {
    abbr: $localize `m³`,
    name: $localize `cubic meter`,
  }
};

const themes = {
  'forums/theme/all-other': $localize `All other`,
  'forums/theme/photos': $localize `Photo themes`,
  'forums/theme/classifier': $localize `Classifier`,
  'forums/theme/this-cite': $localize `This website`,
  'forums/theme/german-cars': $localize `German cars`,
  'forums/theme/italian-cars': $localize `Italian cars`,
  'forums/theme/french-cars': $localize `French cars`,
  'forums/theme/japan-cars': $localize `Japan cars`,
  'forums/theme/korean-cars': $localize `Korean cars`,
  'forums/theme/chinese-cars': $localize `Chinese Cars`,
  'forums/theme/russian-cars': $localize `Russian cars`,
  'forums/theme/american-cars': $localize `American cars`,
  'forums/theme/british-cars': $localize `British cars`,
  'forums/theme/moderators': $localize `Moderators`,
  'forums/theme/cars': $localize `Cars`,
};

const prespectives = {
  'perspective/chassis': $localize `chassis`,
  'perspective/mockup': $localize `mockup`,
  'perspective/front': $localize `front`,
  'perspective/back': $localize `back`,
  'perspective/left': $localize `left`,
  'perspective/right': $localize `right`,
  'perspective/interior': $localize `interior`,
  'perspective/front-panel': $localize `front panel`,
  'perspective/3/4-left': $localize `¾ left`,
  'perspective/3/4-right': $localize `¾ right`,
  'perspective/cutaway': $localize `cutaway`,
  'perspective/front-strict': $localize `front (strict)`,
  'perspective/left-strict': $localize `left (strict)`,
  'perspective/right-strict': $localize `right (strict)`,
  'perspective/back-strict': $localize `back (strict)`,
  'perspective/n/a': $localize `n/a`,
  'perspective/label': $localize `label`,
  'perspective/upper': $localize `upper`,
  'perspective/under-the-hood': $localize `under the hood`,
  'perspective/upper-strict': $localize `upper (strict)`,
  'perspective/bottom': $localize `bottom`,
  'perspective/dashboard': $localize `dashboard`,
  'perspective/boot': $localize `boot`,
  'perspective/logo': $localize `logo`,
  'perspective/mascot': $localize `mascot`,
  'perspective/sketch': $localize `sketch`,
  'perspective/mixed': $localize `mixed`,
  'perspective/exterior-details': $localize `exterior details`,
};

export function getItemTypeTranslation(id: number, type: string): string {
  return translations[id] && translations[id][type] ? translations[id][type] : '-';
}

export function getUnitTranslation(id: number, type: string): string {
  return units[id] && units[id][type] ? units[id][type] : '-';
}

export function getForumsThemeTranslation(id: string): string {
  return themes[id] ? units[id] : '-';
}

export function getPerspectiveTranslation(id: string): string {
  return prespectives[id] ? prespectives[id] : '-';
}
