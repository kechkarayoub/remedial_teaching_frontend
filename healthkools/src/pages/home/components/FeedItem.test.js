import FeedItem from "pages/home/components/FeedItem";
import i18next from 'i18n_init';
import { render, screen } from '@testing-library/react';
 
describe('FeedItem component', () => {
    const feed_test = {
        enclosure: {},
        link: "link test",
        thumbnail: "https://www.example.com/image_url",
        title: "Feed test",
    };
    const feed_test_withouth_img = {
        enclosure: {},
        link: "link test",
        thumbnail: "",
        title: "Feed test",
    };
    test('Should render without crash', async () => {
        render(<FeedItem feed={feed_test} i18n={i18next}/>);
    });
    test('Should contains feed image url', async () => {
        render(<FeedItem feed={feed_test} i18n={i18next}/>);
        const image = screen.getByRole('img');
        expect(image.src).toBe(feed_test.thumbnail || feed_test.enclosure.link);
    });
    test('Should contains default url', async () => {
        render(<FeedItem feed={feed_test_withouth_img} i18n={i18next}/>);
        const image = screen.getByRole('img');
        expect(image.src).toContain("/default_rss_img.png");
    });
    test('Title rendred', async () => {
        render(<FeedItem feed={feed_test_withouth_img} i18n={i18next}/>);
        const title = screen.getByRole('p-title');
        expect(title.textContent).toBe("Feed test");
    });
});
