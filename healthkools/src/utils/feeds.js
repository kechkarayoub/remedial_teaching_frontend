const feeds_urls = {
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
    var feeds_urls_ = feeds_urls[language];
    var checked_languages = [],
        languages_keys = Object.keys(feeds_urls);
    while((!feeds_urls_ || feeds_urls.length === 0) && checked_languages.length !== languages_keys.length){
        checked_languages.push(language);
        feeds_urls_ = feeds_urls[languages_keys.filter(lk => checked_languages.indexOf(lk) === -1)[0]];
    }
    return feeds_urls_[Math.floor(Math.random() * feeds_urls_.length)];
}