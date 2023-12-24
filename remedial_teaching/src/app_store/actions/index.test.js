import { GLOBAL, global_action, LOGIN, login_action } from "app_store/actions";


describe('Global_action function', () => {
    test('Should render without crash', async () => {
        global_action();
    });
  
    test('Should contains props', async () => {
        const ga = global_action({
            a: "a",
            b: "b",
        });
        expect(ga.payload.a).toBe("a");
        expect(ga.payload.b).toBe("b");
        expect(ga.type).toBe(GLOBAL);
    });
});

describe('Login_action function', () => {
    test('Should render without crash', async () => {
        login_action();
    });
  
    test('Should contains props', async () => {
        const la = login_action({
            a: "a",
            b: "b",
        })
        expect(la.payload.a).toBe("a");
        expect(la.payload.b).toBe("b");
        expect(la.type).toBe(LOGIN);
    });
});

