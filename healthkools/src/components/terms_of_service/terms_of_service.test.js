import {get_data} from "./data";
import {get_articles, get_terms_service_notice} from "./terms_of_service";
describe('Get_articles function', () => {
    test('Test get_articles', () => {
        var data = get_data();
        var articles = get_articles(data);
        expect(articles.length).toBe(11);
        expect(articles[0].title.fr).toBe("Objet");
        expect(articles[0].title.es).toBeUndefined();
        expect(articles[0].paragraphs.length).toBe(5);
        expect(articles[2].paragraphs.length).toBe(4);
        expect(articles[0].paragraphs[0].en).toBe("The purpose of these \"general conditions of use\" is to provide a legal framework for the use of the site <a href='" + (data.site_url || "sit_url") + "' target=\"_blank\">" + (data.site_url || "site_url") + "</a> and its services.");
        expect(articles[0].paragraphs[0].list_items).toBeUndefined();
        expect(articles[2].paragraphs[0].list_items.length).toBe(4);
    });
});

describe('Get_terms_service_notice function', () => {
    test('Test get_terms_service_notice', () => {
        let props = {registration_label: "registration_label"};
        var terms_service_notice = get_terms_service_notice(props);
        expect(terms_service_notice.ar).toBe("بالضغط على <b>" + props.registration_label + "</b> ، فإنك توافق على <span class=\"span_link term_of_service_span\">شروط الخدمة</span> الخاصة بنا ، و<span class=\"span_link data_use_policy_span\">سياسة استخدام البيانات</span> و<span class=\"span_link cookie_policy_span\">سياسة ملفات تعريف الارتباط</span> الخاصة بنا.");
        expect(terms_service_notice.es).toBeUndefined();
    });
});