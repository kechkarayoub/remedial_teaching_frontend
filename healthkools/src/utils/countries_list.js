import {get} from "../services/storage";

export const countries = [
    {
        country_code: "AF",
        translations: {
            ar: "أفغانستان",
            en: "Afghanistan",
            fr: "Afghanistan",
        },
    },
    {
        country_code: "AX",
        translations: {
            ar: "جزر آلاند",
            en: "Aland Islands",
            fr: "Iles Aland",
        },
    },
    {
        country_code: "AL",
        translations: {
            ar: "ألبانيا",
            en: "Albania",
            fr: "Albanie",
        },
    },
    {
        country_code: "DZ",
        translations: {
            ar: "الجزائر",
            en: "Algeria",
            fr: "Algérie",
        },
    },
    {
        country_code: "AS",
        translations: {
            ar: "ساموا الأمريكية",
            en: "American Samoa",
            fr: "Samoa américaines",
        },
    },
    {
        country_code: "AD",
        translations: {
            ar: "أندورا",
            en: "Andorra",
            fr: "Andorre",
        },
    },
    {
        country_code: "AO",
        translations: {
            ar: "أنغولا",
            en: "Angola",
            fr: "Angola",
        },
    },
    {
        country_code: "AI",
        translations: {
            ar: "أنغيلا",
            en: "Anguilla",
            fr: "Anguilla",
        },
    },
    {
        country_code: "AQ",
        translations: {
            ar: "أنتاركتيكا",
            en: "Antarctica",
            fr: "Antarctique",
        },
    },
    {
        country_code: "AG",
        translations: {
            ar: "أنتيغوا وبربودا",
            en: "Antigua and Barbuda",
            fr: "Antigua-et-Barbuda",
        },
    },
    {
        country_code: "AR",
        translations: {
            ar: "الأرجنتين",
            en: "Argentina",
            fr: "Argentine",
        },
    },
    {
        country_code: "AM",
        translations: {
            ar: "أرمينيا",
            en: "Armenia",
            fr: "Arménie",
        },
    },
    {
        country_code: "AW",
        translations: {
            ar: "أروبا",
            en: "Aruba",
            fr: "Aruba",
        },
    },
    {
        country_code: "AU",
        translations: {
            ar: "أستراليا",
            en: "Australia",
            fr: "Australie",
        },
    },
    {
        country_code: "AT",
        translations: {
            ar: "النمسا",
            en: "Austria",
            fr: "L'Autriche",
        },
    },
    {
        country_code: "AZ",
        translations: {
            ar: "أذربيجان",
            en: "Azerbaijan",
            fr: "Azerbaïdjan",
        },
    },
    {
        country_code: "BS",
        translations: {
            ar: "جزر البهاما",
            en: "Bahamas",
            fr: "Bahamas",
        },
    },
    {
        country_code: "BH",
        translations: {
            ar: "البحرين",
            en: "Bahrain",
            fr: "Bahreïn",
        },
    },
    {
        country_code: "BD",
        translations: {
            ar: "بنغلاديش",
            en: "Bangladesh",
            fr: "Bangladesh",
        },
    },
    {
        country_code: "BB",
        translations: {
            ar: "بربادوس",
            en: "Barbados",
            fr: "Barbade",
        },
    },
    {
        country_code: "BY",
        translations: {
            ar: "بيلاروسيا",
            en: "Belarus",
            fr: "Biélorussie",
        },
    },
    {
        country_code: "BE",
        translations: {
            ar: "بلجيكا",
            en: "Belgium",
            fr: "Belgique",
        },
    },
    {
        country_code: "BZ",
        translations: {
            ar: "بليز",
            en: "Belize",
            fr: "Belize",
        },
    },
    {
        country_code: "BJ",
        translations: {
            ar: "بنين",
            en: "Benin",
            fr: "Bénin",
        },
    },
    {
        country_code: "BM",
        translations: {
            ar: "برمودا",
            en: "Bermuda",
            fr: "Bermudes",
        },
    },
    {
        country_code: "BT",
        translations: {
            ar: "بوتان",
            en: "Bhutan",
            fr: "Bhoutan",
        },
    },
    {
        country_code: "BO",
        translations: {
            ar: "بوليفيا",
            en: "Bolivia",
            fr: "Bolivie",
        },
    },
    {
        country_code: "BW",
        translations: {
            ar: "بوتسوانا",
            en: "Botswana",
            fr: "Botswana",
        },
    },
    {
        country_code: "BV",
        translations: {
            ar: "جزيرة بوفيت",
            en: "Bouvet Island",
            fr: "Île Bouvet",
        },
    },
    {
        country_code: "BR",
        translations: {
            ar: "البرازيل",
            en: "Brazil",
            fr: "Brésil",
        },
    },
    {
        country_code: "BG",
        translations: {
            ar: "بلغاريا",
            en: "Bulgaria",
            fr: "Bulgarie",
        },
    },
    {
        country_code: "BF",
        translations: {
            ar: "بوركينا فاسو",
            en: "Burkina Faso",
            fr: "Burkina Faso",
        },
    },
    {
        country_code: "BI",
        translations: {
            ar: "بوروندي",
            en: "Burundi",
            fr: "Burundi",
        },
    },
    {
        country_code: "KH",
        translations: {
            ar: "كمبوديا",
            en: "Cambodia",
            fr: "Cambodge",
        },
    },
    {
        country_code: "CM",
        translations: {
            ar: "الكاميرون",
            en: "Cameroon",
            fr: "Cameroun",
        },
    },
    {
        country_code: "CA",
        translations: {
            ar: "كندا",
            en: "Canada",
            fr: "Canada",
        },
    },
    {
        country_code: "CV",
        translations: {
            ar: "الرأس الأخضر",
            en: "Cape Verde",
            fr: "Cap-Vert",
        },
    },
    {
        country_code: "CF",
        translations: {
            ar: "افريقيا الوسطى",
            en: "Central African",
            fr: "République centrafricaine",
        },
    },
    {
        country_code: "TD",
        translations: {
            ar: "تشاد",
            en: "Chad",
            fr: "Tchad",
        },
    },
    {
        country_code: "CL",
        translations: {
            ar: "تشيلي",
            en: "Chile",
            fr: "Chili",
        },
    },
    {
        country_code: "CN",
        translations: {
            ar: "الصين",
            en: "China",
            fr: "Chine",
        },
    },
    {
        country_code: "CO",
        translations: {
            ar: "كولومبيا",
            en: "Colombia",
            fr: "Colombie",
        },
    },
    {
        country_code: "KM",
        translations: {
            ar: "جزر القمر",
            en: "Comoros",
            fr: "Comores",
        },
    },
    {
        country_code: "CG",
        translations: {
            ar: "الكونغو",
            en: "Congo",
            fr: "Congo",
        },
    },
    {
        country_code: "CD",
        translations: {
            ar: "الكونغو الديمقراطية",
            en: "DR Congo",
            fr: "RD Congo",
        },
    },
    {
        country_code: "CR",
        translations: {
            ar: "كوستا ريكا",
            en: "Costa Rica",
            fr: "Costa Rica",
        },
    },
    {
        country_code: "CI",
        translations: {
            ar: "ساحل العاج",
            en: "Cote D'Ivoire",
            fr: "Côte d'Ivoire",
        },
    },
    {
        country_code: "HR",
        translations: {
            ar: "كرواتيا",
            en: "Croatia",
            fr: "Croatie",
        },
    },
    {
        country_code: "CU",
        translations: {
            ar: "كوبا",
            en: "Cuba",
            fr: "Cuba",
        },
    },
    {
        country_code: "CW",
        translations: {
            ar: "كوراكاو",
            en: "Curacao",
            fr: "Curacao",
        },
    },
    {
        country_code: "CY",
        translations: {
            ar: "قبرص",
            en: "Cyprus",
            fr: "Chypre",
        },
    },
    {
        country_code: "CZ",
        translations: {
            ar: "الجمهورية التشيكية",
            en: "Czech Republic",
            fr: "République Tchèque",
        },
    },
    {
        country_code: "DK",
        translations: {
            ar: "الدنمارك",
            en: "Denmark",
            fr: "Danemark",
        },
    },
    {
        country_code: "DJ",
        translations: {
            ar: "جيبوتي",
            en: "Djibouti",
            fr: "Djibouti",
        },
    },
    {
        country_code: "DM",
        translations: {
            ar: "دومينيكا",
            en: "Dominica",
            fr: "Dominique",
        },
    },
    {
        country_code: "DO",
        translations: {
            ar: "جمهورية الدومينيكان",
            en: "Dominican Republic",
            fr: "République dominicaine",
        },
    },
    {
        country_code: "EC",
        translations: {
            ar: "الاكوادور",
            en: "Ecuador",
            fr: "Équateur",
        },
    },
    {
        country_code: "EG",
        translations: {
            ar: "مصر",
            en: "Egypt",
            fr: "Egypte",
        },
    },
    {
        country_code: "SV",
        translations: {
            ar: "السلفادور",
            en: "El Salvador",
            fr: "Le Salvador",
        },
    },
    {
        country_code: "CQ",
        translations: {
            ar: "غينيا الإستوائية",
            en: "Equatorial Guinea",
            fr: "Guinée Équatoriale",
        },
    },
    {
        country_code: "ER",
        translations: {
            ar: "إريتريا",
            en: "Eritrea",
            fr: "Érythrée",
        },
    },
    {
        country_code: "EE",
        translations: {
            ar: "إستونيا",
            en: "Estonia",
            fr: "Estonie",
        },
    },
    {
        country_code: "ET",
        translations: {
            ar: "أثيوبيا",
            en: "Ethiopia",
            fr: "Ethiopie",
        },
    },
    {
        country_code: "FO",
        translations: {
            ar: "جزر فاروس",
            en: "Faroe Islands",
            fr: "Îles Féroé",
        },
    },
    {
        country_code: "FJ",
        translations: {
            ar: "فيجي",
            en: "Fiji",
            fr: "Fidji",
        },
    },
    {
        country_code: "FI",
        translations: {
            ar: "فنلندا",
            en: "Finland",
            fr: "Finlande",
        },
    },
    {
        country_code: "FR",
        translations: {
            ar: "فرنسا",
            en: "France",
            fr: "France",
        },
    },
    {
        country_code: "GF",
        translations: {
            ar: "غيانا الفرنسية",
            en: "French Guiana",
            fr: "Guyane Française",
        },
    },
    {
        country_code: "PF",
        translations: {
            ar: "بولينيزيا الفرنسية",
            en: "French Polynesia",
            fr: "Polynésie française",
        },
    },
    {
        country_code: "GA",
        translations: {
            ar: "الجابون",
            en: "Gabon",
            fr: "Gabon",
        },
    },
    {
        country_code: "GM",
        translations: {
            ar: "غامبيا",
            en: "Gambia",
            fr: "Gambie",
        },
    },
    {
        country_code: "GE",
        translations: {
            ar: "جورجيا",
            en: "Georgia",
            fr: "Géorgie",
        },
    },
    {
        country_code: "DE",
        translations: {
            ar: "ألمانيا",
            en: "Germany",
            fr: "Allemagne",
        },
    },
    {
        country_code: "GH",
        translations: {
            ar: "غانا",
            en: "Ghana",
            fr: "Ghana",
        },
    },
    {
        country_code: "GI",
        translations: {
            ar: "جبل طارق",
            en: "Gibraltar",
            fr: "Gibraltar",
        },
    },
    {
        country_code: "GR",
        translations: {
            ar: "اليونان",
            en: "Greece",
            fr: "Grèce",
        },
    },
    {
        country_code: "GL",
        translations: {
            ar: "جرينلاند",
            en: "Greenland",
            fr: "Groenland",
        },
    },
    {
        country_code: "GD",
        translations: {
            ar: "غرينادا",
            en: "Grenada",
            fr: "Grenade",
        },
    },
    {
        country_code: "GP",
        translations: {
            ar: "جوادلوب",
            en: "Guadeloupe",
            fr: "Guadeloupe",
        },
    },
    {
        country_code: "GU",
        translations: {
            ar: "غوام",
            en: "Guam",
            fr: "Guam",
        },
    },
    {
        country_code: "GT",
        translations: {
            ar: "غواتيمالا",
            en: "Guatemala",
            fr: "Guatemala",
        },
    },
    {
        country_code: "GG",
        translations: {
            ar: "غيرنسي",
            en: "Guernsey",
            fr: "Guernesey",
        },
    },
    {
        country_code: "GN",
        translations: {
            ar: "غينيا",
            en: "Guinea",
            fr: "Guinée",
        },
    },
    {
        country_code: "GW",
        translations: {
            ar: "غينيا بيساو",
            en: "Guinea-Bissau",
            fr: "Guinée-Bissau",
        },
    },
    {
        country_code: "GY",
        translations: {
            ar: "غيانا",
            en: "Guyana",
            fr: "Guyane",
        },
    },
    {
        country_code: "HT",
        translations: {
            ar: "هايتي",
            en: "Haiti",
            fr: "Haïti",
        },
    },
    {
        country_code: "HN",
        translations: {
            ar: "هندوراس",
            en: "Honduras",
            fr: "Honduras",
        },
    },
    {
        country_code: "HK",
        translations: {
            ar: "هونج كونج",
            en: "Hong Kong",
            fr: "Hong Kong",
        },
    },
    {
        country_code: "HU",
        translations: {
            ar: "هنغاريا",
            en: "Hungary",
            fr: "Hongrie",
        },
    },
    {
        country_code: "IS",
        translations: {
            ar: "أيسلندا",
            en: "Iceland",
            fr: "Islande",
        },
    },
    {
        country_code: "IN",
        translations: {
            ar: "الهند",
            en: "India",
            fr: "Inde",
        },
    },
    {
        country_code: "ID",
        translations: {
            ar: "إندونيسيا",
            en: "Indonesia",
            fr: "Indonésie",
        },
    },
    {
        country_code: "IR",
        translations: {
            ar: "إيران",
            en: "Iran",
            fr: "Iran",
        },
    },
    {
        country_code: "IQ",
        translations: {
            ar: "العراق",
            en: "Iraq",
            fr: "Irak",
        },
    },
    {
        country_code: "IE",
        translations: {
            ar: "أيرلندا",
            en: "Ireland",
            fr: "Irlande",
        },
    },
    {
        country_code: "IM",
        translations: {
            ar: "آيل أوف مان",
            en: "Isle of Man",
            fr: "île de Man",
        },
    },
    {
        country_code: "IT",
        translations: {
            ar: "إيطاليا",
            en: "Italy",
            fr: "Italie",
        },
    },
    {
        country_code: "JM",
        translations: {
            ar: "جامايكا",
            en: "Jamaica",
            fr: "Jamaïque",
        },
    },
    {
        country_code: "JP",
        translations: {
            ar: "اليابان",
            en: "Japan",
            fr: "Japon",
        },
    },
    {
        country_code: "JE",
        translations: {
            ar: "جيرسي",
            en: "Jersey",
            fr: "Jersey",
        },
    },
    {
        country_code: "JO",
        translations: {
            ar: "الأردن",
            en: "Jordan",
            fr: "Jordan",
        },
    },
    {
        country_code: "KZ",
        translations: {
            ar: "كازاخستان",
            en: "Kazakhstan",
            fr: "Kazakhstan",
        },
    },
    {
        country_code: "KE",
        translations: {
            ar: "كينيا",
            en: "Kenya",
            fr: "Kenya",
        },
    },
    {
        country_code: "KI",
        translations: {
            ar: "كيريباتي",
            en: "Kiribati",
            fr: "Kiribati",
        },
    },
    {
        country_code: "XK",
        translations: {
            ar: "كوسوفو",
            en: "Kosovo",
            fr: "Kosovo",
        },
    },
    {
        country_code: "KW",
        translations: {
            ar: "الكويت",
            en: "Kuwait",
            fr: "Koweit",
        },
    },
    {
        country_code: "KG",
        translations: {
            ar: "قيرغيزستان",
            en: "Kyrgyzstan",
            fr: "Kirghizistan",
        },
    },
    {
        country_code: "LV",
        translations: {
            ar: "لاتفيا",
            en: "Latvia",
            fr: "Lettonie",
        },
    },
    {
        country_code: "LB",
        translations: {
            ar: "لبنان",
            en: "Lebanon",
            fr: "Liban",
        },
    },
    {
        country_code: "LR",
        translations: {
            ar: "ليبيريا",
            en: "Liberia",
            fr: "Libéria",
        },
    },
    {
        country_code: "LY",
        translations: {
            ar: "ليبيا",
            en: "Libya",
            fr: "Libye",
        },
    },
    {
        country_code: "LT",
        translations: {
            ar: "ليتوانيا",
            en: "Lithuania",
            fr: "Lituanie",
        },
    },
    {
        country_code: "LU",
        translations: {
            ar: "لوكسمبورغ",
            en: "Luxembourg",
            fr: "Luxembourg",
        },
    },
    {
        country_code: "MO",
        translations: {
            ar: "ماكاو",
            en: "Macao",
            fr: "Macao",
        },
    },
    {
        country_code: "MK",
        translations: {
            ar: "مقدونيا",
            en: "Macedonia",
            fr: "Macédoine",
        },
    },
    {
        country_code: "MG",
        translations: {
            ar: "مدغشقر",
            en: "Madagascar",
            fr: "Madagascar",
        },
    },
    {
        country_code: "MW",
        translations: {
            ar: "ملاوي",
            en: "Malawi",
            fr: "Malawi",
        },
    },
    {
        country_code: "MY",
        translations: {
            ar: "ماليزيا",
            en: "Malaysia",
            fr: "Malaisie",
        },
    },
    {
        country_code: "MV",
        translations: {
            ar: "جزر المالديف",
            en: "Maldives",
            fr: "Maldives",
        },
    },
    {
        country_code: "ML",
        translations: {
            ar: "مالي",
            en: "Mali",
            fr: "Mali",
        },
    },
    {
        country_code: "MT",
        translations: {
            ar: "مالطا",
            en: "Malta",
            fr: "Malte",
        },
    },
    {
        country_code: "MH",
        translations: {
            ar: "جزر مارشال",
            en: "Marshall Islands",
            fr: "Iles Marshall",
        },
    },
    {
        country_code: "MQ",
        translations: {
            ar: "مارتينيك",
            en: "Martinique",
            fr: "Martinique",
        },
    },
    {
        country_code: "MR",
        translations: {
            ar: "موريتانيا",
            en: "Mauritania",
            fr: "Mauritanie",
        },
    },
    {
        country_code: "MU",
        translations: {
            ar: "موريشيوس",
            en: "Mauritius",
            fr: "Maurice",
        },
    },
    {
        country_code: "YT",
        translations: {
            ar: "مايوت",
            en: "Mayotte",
            fr: "Mayotte",
        },
    },
    {
        country_code: "MX",
        translations: {
            ar: "المكسيك",
            en: "Mexico",
            fr: "Mexique",
        },
    },
    {
        country_code: "MD",
        translations: {
            ar: "مولدوفا",
            en: "Moldova",
            fr: "Moldavie",
        },
    },
    {
        country_code: "MC",
        translations: {
            ar: "موناكو",
            en: "Monaco",
            fr: "Monaco",
        },
    },
    {
        country_code: "MN",
        translations: {
            ar: "منغوليا",
            en: "Mongolia",
            fr: "Mongolie",
        },
    },
    {
        country_code: "ME",
        translations: {
            ar: "الجبل الأسود",
            en: "Montenegro",
            fr: "Monténégro",
        },
    },
    {
        country_code: "MS",
        translations: {
            ar: "مونتسيرات",
            en: "Montserrat",
            fr: "Montserrat",
        },
    },
    {
        country_code: "MA",
        translations: {
            ar: "المغرب",
            en: "Morocco",
            fr: "Maroc",
        },
    },
    {
        country_code: "MZ",
        translations: {
            ar: "موزمبيق",
            en: "Mozambique",
            fr: "Mozambique",
        },
    },
    {
        country_code: "MM",
        translations: {
            ar: "ميانمار",
            en: "Myanmar",
            fr: "Birmanie",
        },
    },
    {
        country_code: "NA",
        translations: {
            ar: "ناميبيا",
            en: "Namibia",
            fr: "Namibie",
        },
    },
    {
        country_code: "NR",
        translations: {
            ar: "ناورو",
            en: "Nauru",
            fr: "Nauru",
        },
    },
    {
        country_code: "NP",
        translations: {
            ar: "نيبال",
            en: "Nepal",
            fr: "Népal",
        },
    },
    {
        country_code: "NL",
        translations: {
            ar: "هولندا",
            en: "Netherlands",
            fr: "Pays-Bas",
        },
    },
    {
        country_code: "AN",
        translations: {
            ar: "جزر الأنتيل الهولندية",
            en: "Netherlands Antilles",
            fr: "Antilles néerlandaises",
        },
    },
    {
        country_code: "NC",
        translations: {
            ar: "كاليدونيا الجديدة",
            en: "New Caledonia",
            fr: "Nouvelle Calédonie",
        },
    },
    {
        country_code: "NZ",
        translations: {
            ar: "نيوزيلاندا",
            en: "New Zealand",
            fr: "Nouvelle-Zélande",
        },
    },
    {
        country_code: "NI",
        translations: {
            ar: "نيكاراغوا",
            en: "Nicaragua",
            fr: "Nicaragua",
        },
    },
    {
        country_code: "NE",
        translations: {
            ar: "النيجر",
            en: "Niger",
            fr: "Niger",
        },
    },
    {
        country_code: "NG",
        translations: {
            ar: "نيجيريا",
            en: "Nigeria",
            fr: "Nigeria",
        },
    },
    {
        country_code: "NU",
        translations: {
            ar: "نيوي",
            en: "Niue",
            fr: "Nioué",
        },
    },
    {
        country_code: "NF",
        translations: {
            ar: "جزيرة نورفولك",
            en: "Norfolk Island",
            fr: "l'ile de Norfolk",
        },
    },
    {
        country_code: "KP",
        translations: {
            ar: "كوريا الشمالية",
            en: "North Korea",
            fr: "Corée du Nord",
        },
    },
    {
        country_code: "NO",
        translations: {
            ar: "النرويج",
            en: "Norway",
            fr: "Norvège",
        },
    },
    {
        country_code: "OM",
        translations: {
            ar: "سلطنة عمان",
            en: "Oman",
            fr: "Oman",
        },
    },
    {
        country_code: "PK",
        translations: {
            ar: "باكستان",
            en: "Pakistan",
            fr: "Pakistan",
        },
    },
    {
        country_code: "PW",
        translations: {
            ar: "بالاو",
            en: "Palau",
            fr: "Palaos",
        },
    },
    {
        country_code: "PS",
        translations: {
            ar: "فلسطين",
            en: "Palestine",
            fr: "Palestine",
        },
    },
    {
        country_code: "PA",
        translations: {
            ar: "بنما",
            en: "Panama",
            fr: "Panama",
        },
    },
    {
        country_code: "PY",
        translations: {
            ar: "باراغواي",
            en: "Paraguay",
            fr: "Paraguay",
        },
    },
    {
        country_code: "PE",
        translations: {
            ar: "بيرو",
            en: "Peru",
            fr: "Pérou",
        },
    },
    {
        country_code: "PH",
        translations: {
            ar: "الفلبين",
            en: "Philippines",
            fr: "Philippines",
        },
    },
    {
        country_code: "PL",
        translations: {
            ar: "بولندا",
            en: "Poland",
            fr: "Pologne",
        },
    },
    {
        country_code: "PT",
        translations: {
            ar: "البرتغال",
            en: "Portugal",
            fr: "Portugal",
        },
    },
    {
        country_code: "PR",
        translations: {
            ar: "بورتو ريكو",
            en: "Puerto Rico",
            fr: "Porto Rico",
        },
    },
    {
        country_code: "QA",
        translations: {
            ar: "قطر",
            en: "Qatar",
            fr: "Qatar",
        },
    },
    {
        country_code: "RO",
        translations: {
            ar: "رومانيا",
            en: "Romania",
            fr: "Roumanie",
        },
    },
    {
        country_code: "RU",
        translations: {
            ar: "روسيا",
            en: "Russia",
            fr: "Russie",
        },
    },
    {
        country_code: "RW",
        translations: {
            ar: "رواندا",
            en: "Rwanda",
            fr: "Rwanda",
        },
    },
    {
        country_code: "WS",
        translations: {
            ar: "ساموا",
            en: "Samoa",
            fr: "Samoa",
        },
    },
    {
        country_code: "SM",
        translations: {
            ar: "سان مارينو",
            en: "San Marino",
            fr: "Saint Marin",
        },
    },
    {
        country_code: "SA",
        translations: {
            ar: "المملكة العربية السعودية",
            en: "Saudi Arabia",
            fr: "Arabie Saoudite",
        },
    },
    {
        country_code: "SN",
        translations: {
            ar: "السنغال",
            en: "Senegal",
            fr: "Sénégal",
        },
    },
    {
        country_code: "RS",
        translations: {
            ar: "صربيا",
            en: "Serbia",
            fr: "Serbie",
        },
    },
    {
        country_code: "SC",
        translations: {
            ar: "سيشيل",
            en: "Seychelles",
            fr: "Seychelles",
        },
    },
    {
        country_code: "SL",
        translations: {
            ar: "سيرا ليون",
            en: "Sierra Leone",
            fr: "Sierra Leone",
        },
    },
    {
        country_code: "SG",
        translations: {
            ar: "سنغافورة",
            en: "Singapore",
            fr: "Singapour",
        },
    },
    {
        country_code: "SK",
        translations: {
            ar: "سلوفاكيا",
            en: "Slovakia",
            fr: "Slovaquie",
        },
    },
    {
        country_code: "SI",
        translations: {
            ar: "سلوفينيا",
            en: "Slovenia",
            fr: "Slovénie",
        },
    },
    {
        country_code: "SB",
        translations: {
            ar: "جزر سليمان",
            en: "Solomon Islands",
            fr: "Les îles Salomon",
        },
    },
    {
        country_code: "SO",
        translations: {
            ar: "الصومال",
            en: "Somalia",
            fr: "Somalie",
        },
    },
    {
        country_code: "ZA",
        translations: {
            ar: "جنوب أفريقيا",
            en: "South Africa",
            fr: "Afrique du Sud",
        },
    },
    {
        country_code: "KR",
        translations: {
            ar: "كوريا الجنوبية",
            en: "South Korea",
            fr: "Corée du Sud",
        },
    },
    {
        country_code: "SS",
        translations: {
            ar: "جنوب السودان",
            en: "South Sudan",
            fr: "Soudan du sud",
        },
    },
    {
        country_code: "ES",
        translations: {
            ar: "إسبانيا",
            en: "Spain",
            fr: "Espagne",
        },
    },
    {
        country_code: "LK",
        translations: {
            ar: "سيريلانكا",
            en: "Sri Lanka",
            fr: "Sri Lanka",
        },
    },
    {
        country_code: "SD",
        translations: {
            ar: "السودان",
            en: "Sudan",
            fr: "Soudan",
        },
    },
    {
        country_code: "ZR",
        translations: {
            ar: "سورينام",
            en: "Suriname",
            fr: "Surinam",
        },
    },
    {
        country_code: "SZ",
        translations: {
            ar: "سوازيلاند",
            en: "Swaziland",
            fr: "Swaziland",
        },
    },
    {
        country_code: "SE",
        translations: {
            ar: "السويد",
            en: "Sweden",
            fr: "Suède",
        },
    },
    {
        country_code: "CH",
        translations: {
            ar: "سويسرا",
            en: "Switzerland",
            fr: "Suisse",
        },
    },
    {
        country_code: "SY",
        translations: {
            ar: "سوريا",
            en: "Syria",
            fr: "Syrie",
        },
    },
    {
        country_code: "TW",
        translations: {
            ar: "تايوان",
            en: "Taiwan",
            fr: "Taïwan",
        },
    },
    {
        country_code: "TJ",
        translations: {
            ar: "طاجيكستان",
            en: "Tajikistan",
            fr: "Tadjikistan",
        },
    },
    {
        country_code: "TZ",
        translations: {
            ar: "تنزانيا",
            en: "Tanzania",
            fr: "Tanzanie",
        },
    },
    {
        country_code: "TH",
        translations: {
            ar: "تايلاند",
            en: "Thailand",
            fr: "Thaïlande",
        },
    },
    {
        country_code: "TL",
        translations: {
            ar: "تيمور ليشتي",
            en: "Timor-Leste",
            fr: "Timor-Leste",
        },
    },
    {
        country_code: "TG",
        translations: {
            ar: "توغو",
            en: "Togo",
            fr: "Togo",
        },
    },
    {
        country_code: "TK",
        translations: {
            ar: "توكيلاو",
            en: "Tokelau",
            fr: "Tokélaou",
        },
    },
    {
        country_code: "TO",
        translations: {
            ar: "تونغا",
            en: "Tonga",
            fr: "Tonga",
        },
    },
    {
        country_code: "TT",
        translations: {
            ar: "ترينداد وتوباغو",
            en: "Trinidad and Tobago",
            fr: "Trinité-et-Tobago",
        },
    },
    {
        country_code: "TN",
        translations: {
            ar: "تونس",
            en: "Tunisia",
            fr: "Tunisie",
        },
    },
    {
        country_code: "TR",
        translations: {
            ar: "تركيا",
            en: "Turkey",
            fr: "Turquie",
        },
    },
    {
        country_code: "TM",
        translations: {
            ar: "تركمانستان",
            en: "Turkmenistan",
            fr: "Turkménistan",
        },
    },
    {
        country_code: "TV",
        translations: {
            ar: "توفالو",
            en: "Tuvalu",
            fr: "Tuvalu",
        },
    },
    {
        country_code: "UG",
        translations: {
            ar: "أوغندا",
            en: "Uganda",
            fr: "Ouganda",
        },
    },
    {
        country_code: "UA",
        translations: {
            ar: "أوكرانيا",
            en: "Ukraine",
            fr: "Ukraine",
        },
    },
    {
        country_code: "AE",
        translations: {
            ar: "الإمارات العربية المتحدة",
            en: "United Arab Emirates",
            fr: "Emirats Arabes Unis",
        },
    },
    {
        country_code: "GB",
        translations: {
            ar: "المملكة المتحدة",
            en: "United Kingdom",
            fr: "Royaume-Uni",
        },
    },
    {
        country_code: "US",
        translations: {
            ar: "الولايات المتحدة الأمريكية",
            en: "United States",
            fr: "États Unis",
        },
    },
    {
        country_code: "UY",
        translations: {
            ar: "أوروغواي",
            en: "Uruguay",
            fr: "Uruguay",
        },
    },
    {
        country_code: "UZ",
        translations: {
            ar: "أوزبكستان",
            en: "Uzbekistan",
            fr: "Ouzbékistan",
        },
    },
    {
        country_code: "VU",
        translations: {
            ar: "فانواتو",
            en: "Vanuatu",
            fr: "Vanuatu",
        },
    },
    {
        country_code: "VE",
        translations: {
            ar: "فنزويلا",
            en: "Venezuela",
            fr: "Venezuela",
        },
    },
    {
        country_code: "VN",
        translations: {
            ar: "فييت نام",
            en: "Viet Nam",
            fr: "Viet Nam",
        },
    },
    {
        country_code: "YE",
        translations: {
            ar: "اليمن",
            en: "Yemen",
            fr: "Yémen",
        },
    },
    {
        country_code: "ZM",
        translations: {
            ar: "زامبيا",
            en: "Zambia",
            fr: "Zambie",
        },
    },
    {
        country_code: "ZW",
        translations: {
            ar: "زيمبابوي",
            en: "Zimbabwe",
            fr: "Zimbabwe",
        },
    },
];

export const get_contries_select_options = (current_language , t) => {
    current_language = current_language || get("current_language");
    var countries_ = countries.sort((a, b) => {
        return a.translations[current_language] < b.translations[current_language] ? -1 : 1;
    });
    var countries_options = [];
    countries_.map(country => {
        countries_options.push({label: country.translations[current_language], value: country.country_code,});
    });
    return countries_options;
};

