export const feeds_urls = {
    ar: [
        "https://aawsat.com/feed/health",
        "https://news.un.org/feed/subscribe/ar/news/topic/health/feed/rss.xml",
        "https://www.almaghribtoday.net/health/rss.xml",
        "https://www.casablancatoday.com/health/rss.xml",
        "https://www.moh.gov.bh/News/Rss/ar",
    ],
    en: [
        "http://rssfeeds.webmd.com/rss/rss.aspx?RSSSource=RSS_PUBLIC",
        "https://blog.myfitnesspal.com/feed/",
        "https://blogs.cisco.com/healthcare/feed",
        "https://feeds.npr.org/103537970/rss.xml",
        "https://www.healthstatus.com/feed/",
        "https://www.mobihealthnews.com/feed",
    ],
    fr: [
        "https://www.santemagazine.fr/feeds/rss",
        "https://www.santemagazine.fr/feeds/rss/alimentation",
        "https://www.santemagazine.fr/feeds/rss/beaute-forme",
        "https://www.santemagazine.fr/feeds/rss/medecines-alternatives",
        "https://www.santemagazine.fr/feeds/rss/minceur",
        "https://www.santemagazine.fr/feeds/rss/sante",
        "https://www.santemagazine.fr/feeds/rss/traitement",
    ],
};

export const get_feeds_url = language => {
    /*
        get_feeds_url get one of the rss urls in feeds_urls for the requested language.
        if the language not exists, the returned url is one of exists urls
    */
    var feeds_urls_ = feeds_urls[language];
    var languages_keys = Object.keys(feeds_urls);
    if(!feeds_urls_ && languages_keys[0]){
        feeds_urls_ = feeds_urls[languages_keys[0]];
    }
    return (feeds_urls_ || [])[Math.floor(Math.random() * feeds_urls_.length)];
}