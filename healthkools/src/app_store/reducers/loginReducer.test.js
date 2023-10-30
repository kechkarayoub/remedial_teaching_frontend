import loginReducer from "app_store/reducers/loginReducer";
import { login_action } from "app_store/actions";

describe('RootReducer', () => {
    test('Should render without crash', async () => {
      loginReducer(null, {});
    });
  
    test('Should get initial state', async () => {
      const la = login_action({
          a: "a",
          b: "b",
      });
      var initial_state = loginReducer(null, {});
      expect(initial_state.user).toBe(undefined);
      expect(initial_state.authenticated).toBe(false);
  });
  test('Should contains payload', async () => {
      const la = login_action({
          a: "a",
          b: "b",
      });
      var new_stste = loginReducer(null, la);
      expect(new_stste.user).toBe(undefined);
      expect(new_stste.authenticated).toBe(false);
      expect(new_stste.a).toBe(undefined);
      expect(new_stste.b).toBe(undefined);
  });
});
