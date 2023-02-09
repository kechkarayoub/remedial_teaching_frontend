import {feeds_urls, get_feeds_url} from "utils/feeds"

describe('Get_feeds_url function', () => {
    test('Get arabic feeds url ', () => {
        expect(feeds_urls["ar"]).toContain(get_feeds_url("ar"));
    });
    test('Get english feeds url ', () => {
        expect(feeds_urls["en"]).toContain(get_feeds_url("en"));
    });
    test('Get french feeds url ', () => {
        expect(feeds_urls["fr"]).toContain(get_feeds_url("fr"));
    });
    test('Get other language feeds url ', () => {
        expect(feeds_urls["ar"]).toContain(get_feeds_url("other"));
    });
});