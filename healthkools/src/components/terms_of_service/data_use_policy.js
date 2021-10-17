export const get_intro_articles = (data) => {
    return {
        intro: {
            ar: `توضح هذه السياسة المعلومات التي نتولى معالجتها بهدف دعم <b>${data.site_name || "site_name"}</b> وغيرها من المنتجات والميزات التي تقدمها شركة <b>${data.company_name || "company_name"}</b>.`,
            en: `This Policy describes the information we process to support <b>${data.site_name || "site_name"}</b> and other products and features offered by <b>${data.company_name || "company_name"}</b>.`,
            fr: `La présente politique décrit les informations que nous traitons pour le fonctionnement de <b>${data.site_name || "site_name"}</b> et d’autres fonctionnalités et produits proposés par <b>${data.company_name || "company_name"}</b>.`,
        },
        articles: [
            // {
            //     title: {
            //         ar: "الموضوع",
            //         en: "Objet",
            //         fr: "Object",
            //     },
            //     paragraphs: [
            //         {
            //             ar: `الغرض من "شروط الاستخدام العامة" هذه هو توفير إطار قانوني لاستخدام موقع <a href='${data.site_url || "site_url"}' target="_blank">${data.site_url || "site_url"}</a> وخدماته.`,
            //             en: `The purpose of these "general conditions of use" is to provide a legal framework for the use of the site <a href='${data.site_url || "site_url"}' target="_blank">${data.site_url || "site_url"}</a> and its services.`,
            //             fr: `Les présentes « conditions générales d'utilisation » ont pour objet l'encadrement juridique de l’utilisation du site <a href='${data.site_url || "site_url"}' target="_blank">${data.site_url || "site_url"}</a> et de ses services.`,
            //         },
            //         {
            //             ar: `يُبرم هذا العقد بين:`,
            //             en: `This contract is concluded between:`,
            //             fr: `Ce contrat est conclu entre :`,
            //         },
            //         {
            //             ar: `مدير الموقع ، المشار إليه فيما يلي باسم "الناشر" ،`,
            //             en: `The manager of the website, hereinafter referred to as "the Publisher",`,
            //             fr: `Le gérant du site internet, ci-après désigné « l’Éditeur »,`,
            //         },
            //         {
            //             ar: `أي شخص طبيعي أو اعتباري يرغب في الوصول إلى الموقع وخدماته ، المشار إليه فيما بعد باسم "المستخدم".`,
            //             en: `Any natural or legal person wishing to access the site and its services, hereinafter referred to as "the User".`,
            //             fr: `Toute personne physique ou morale souhaitant accéder au site et à ses services, ci-après appelé « l’Utilisateur ».`,
            //         },
            //         {
            //             ar: `يجب قبول الشروط العامة للاستخدام من قبل أي مستخدم ، ويشكل الوصول إلى الموقع قبولًا لهذه الشروط.`,
            //             en: `The general conditions of use must be accepted by any User, and access to the site constitutes acceptance of these conditions.`,
            //             fr: `Les conditions générales d'utilisation doivent être acceptées par tout Utilisateur, et son accès au site vaut acceptation de ces conditions.`,
            //         },
            //     ]
            // },

        ]
    };
};
