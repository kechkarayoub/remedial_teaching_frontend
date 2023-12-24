import { get_data } from "components/terms_of_service/data";
import { get_intro_items } from "components/terms_of_service/data_use_policy";

describe('Get_intro_items function', () => {
    test('Test get_intro_items', () => {
        var data = get_data();
        var intro_items = get_intro_items(data);
        var intro = intro_items.intro;
        var items = intro_items.items;
        expect(intro.en).toBe("This Policy describes the information we process to support <b>" + (data.site_name || "site_name") + "</b> and other products and features offered by <b>" + (data.company_name || "company_name") + "</b>.");
        expect(intro.es).toBeUndefined();
        expect(items.length).toBe(4);
        expect(items[0].title.fr).toBe("Quels types d'informations recueillons-nous ?");
        expect(items[0].intro.ar).toBe("حتى نتمكن من توفير خدمات <b>" + (data.site_name || "site_name") + "</b>، يجب علينا معالجة معلومات عنك. وتعتمد أنواع المعلومات التي نجمعها على طبيعة استخدامك لمنتجاتنا.");
        expect(items[0].paragraphs.length).toBe(3);
        expect(items[2].paragraphs.length).toBe(2);
        expect(items[0].paragraphs[1].list_items.length).toBe(1);
        expect(items[1].paragraphs[0].list_items.length).toBe(1);
        expect(items[0].paragraphs[0].list_items[0].sub_list_items).toBeUndefined();
        expect(items[1].paragraphs[0].list_items[0].sub_list_items.length).toBe(4);
    });
});
