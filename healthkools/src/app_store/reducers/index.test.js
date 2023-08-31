import { global_action } from "app_store/actions";
import rootReducer from "app_store/reducers";


describe('RootReducer', () => {
    test('Should render without crash', async () => {
        rootReducer(null, {});
    });
  
    test('Should contains payload', async () => {
        const ga = global_action({
            a: "a",
            b: "b",
        });
        var new_stste = rootReducer(null, {});
        expect(new_stste.a).toBe(undefined);
        expect(new_stste.b).toBe(undefined);
        new_stste = rootReducer({}, ga);
        expect(new_stste.a).toBe("a");
        expect(new_stste.b).toBe("b");
    });
});
