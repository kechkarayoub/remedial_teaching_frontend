import {get_data} from "./data";
import {get_intro_items} from "./cookies_policy";
describe('Get_intro_items function', () => {
    test('Test get_intro_items', () => {
        var data = get_data();
        var intro_items = get_intro_items(data);
        var intro = intro_items.intro;
        var items = intro_items.items;
        expect(intro.en).toBe("Cookies are small pieces of text used to store information on web browsers. Cookies are used to store and receive identifiers and other information on computers, phones and other devices. Other technologies, including data that we store on your web browser or device, identifiers associated with your device and other software, are used for similar purposes. In this policy, we refer to all of these technologies as « cookies ».<br/>We use cookies if you have a <b>" + (data.site_name || "site_name") + "</b> account, use the <b>" + (data.site_name || "site_name") + "</b> products, including our website and apps, or visit other websites and apps that use the <b>" + (data.site_name || "site_name") + "</b> products. Cookies enable <b>" + (data.site_name || "site_name") + "</b> to offer the <b>" + (data.site_name || "site_name") + "</b> products to you and to understand the information that we receive about you, including information about your use of other websites and apps, whether or not you are registered or logged in.<br/>This policy explains how we use cookies and the choices you have. Except as otherwise stated in this policy, the Data Policy will apply to our processing of the data that we collect via cookies.");
        expect(intro.es).toBeUndefined();
        expect(items.length).toBe(4);
        expect(items[0].title.fr).toBe("Pourquoi utilisons-nous des cookies ?");
        expect(items[0].intro.ar).toBe("تساعدنا ملفات تعريف الارتباط على توفير منتجات <b>" + (data.site_name || "site_name") + "</b> وحمايتها وتحسينها، على سبيل المثال، عن طريق إضفاء طابع شخصي على المحتوى وتخصيص الإعلانات وقياسها وتقديم تجربة أكثر أمانًا. تتضمن ملفات تعريف الارتباط التي نستخدمها ملفات تعريف ارتباط الجلسات، والتي يتم حذفها عند إغلاق المتصفح، وملفات تعريف الارتباط الدائمة، والتي تبقى على المتصفح حتى تنتهي صلاحيتها أو يتم حذفها. ونظرًا لتغير أسماء ملفات تعريف الارتباط التي نستخدمها من حين لآخر أثناء تحسين منتجات <b>" + (data.site_name || "site_name") + "</b> التي نقدمها وتحديثها، نستخدم ملفات تعريف الارتباط للأغراض التالية:");
        expect(items[0].paragraphs.length).toBe(7);
        expect(items[2].paragraphs.length).toBe(0);
        expect(items[0].paragraphs[1].list_items.length).toBe(2);
        expect(items[1].paragraphs[0].list_items).toBeUndefined();
    });
});