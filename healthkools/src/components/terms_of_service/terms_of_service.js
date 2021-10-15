import {get} from "../../services/storage";
export const get_articles = (company_data, site_responsable) => {
    const general_information = get("general_information");
    return [
        {
            title: {
                ar: "الموضوع",
                en: "Objet",
                fr: "Object",
            },
            paragraphs: [
                {
                    ar: `الغرض من ${general_information.site_url || "******"} هذه هو توفير إطار قانوني لاستخدام موقع www.site.com وخدماته.`,
                    en: `The purpose of these "general conditions of use" is to provide a legal framework for the use of the site ${general_information.site_url || "******"} and its services.`,
                    fr: `Les présentes « conditions générales d'utilisation » ont pour objet l'encadrement juridique de l’utilisation du site ${general_information.site_url || "******"} et de ses services.`,
                },
                {
                    ar: `يُبرم هذا العقد بين:`,
                    en: `This contract is concluded between:`,
                    fr: `Ce contrat est conclu entre :`,
                },
                {
                    ar: `مدير الموقع ، المشار إليه فيما يلي باسم "الناشر" ،`,
                    en: `The manager of the website, hereinafter referred to as "the Publisher",`,
                    fr: `Le gérant du site internet, ci-après désigné « l’Éditeur »,`,
                },
                {
                    ar: `أي شخص طبيعي أو اعتباري يرغب في الوصول إلى الموقع وخدماته ، المشار إليه فيما بعد باسم "المستخدم"." ،`,
                    en: `Any natural or legal person wishing to access the site and its services, hereinafter referred to as "the User".`,
                    fr: `Toute personne physique ou morale souhaitant accéder au site et à ses services, ci-après appelé « l’Utilisateur ».`,
                },
                {
                    ar: `يجب قبول الشروط العامة للاستخدام من قبل أي مستخدم ، ويشكل الوصول إلى الموقع قبولًا لهذه الشروط.`,
                    en: `The general conditions of use must be accepted by any User, and access to the site constitutes acceptance of these conditions.`,
                    fr: `Les conditions générales d'utilisation doivent être acceptées par tout Utilisateur, et son accès au site vaut acceptation de ces conditions.`,
                },
            ]
        },
        {
            title: {
                ar: "إشعار قانوني",
                en: "Legal Notice",
                fr: "Mentions légales",
            },
            paragraphs: [
                {
                    ar: `للأشخاص الاعتباريين:`,
                    en: `For legal persons:`,
                    fr: `Pour les personnes morales :`,
                },
                {
                    ar: `يتم نشر الموقع ${general_information.site_url || "******"} من قبل الشركة ${company_data.name || "******"} ، ${company_data.legal_status || "******"}  برأس مال قدره ${company_data.capital || "******"} د.م ، التي يقع مكتبها الرئيسي في ${company_data.address || "******"}.`,
                    en: `The site ${general_information.site_url || "******"} is published by the company ${company_data.name || "******"}, ${company_data.legal_status || "******"} with a capital of ${company_data.capital || "******"} MAD, whose head office is located at ${company_data.address || "******"}.`,
                    fr: `Le site ${general_information.site_url || "******"} est édité par la société ${company_data.name || "******"}, ${company_data.legal_status || "******"} au capital de ${company_data.capital || "******"} MAD, dont le siège social est situé au ${company_data.address || "******"}.`,
                },
                {
                    ar: `.${company_data.responsable_full_name || "******"} ويمثل الشركة`,
                    en: `The company is represented by ${company_data.responsable_full_name || "******"}.`,
                    fr: `La société est représentée par ${company_data.responsable_full_name || "******"}.`,
                },
                {
                    ar: `للأفراد:`,
                    en: `For individuals:`,
                    fr: `Pour les personnes physiques :`,
                },
                {
                    ar: `.${site_responsable.address || "******"} والمقيم في ،${site_responsable.full_name || "******"} بواسطة ${general_information.site_url || "******"} يتم تحرير موقع`,
                    en: `The ${general_information.site_url || "******"} site is edited by ${site_responsable.full_name || "******"}, domicilié au ${site_responsable.address || "******"}.`,
                    fr: `Le site ${general_information.site_url || "******"} est édité par ${site_responsable.full_name || "******"}, domiciled at ${site_responsable.address || "******"}.`,
                },
            ]
        },
    ];
};