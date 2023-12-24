import store from "app_store"

describe('Redux Store Configuration', () => {
  test('Should configure the store correctly', () => {
    // Access the store's getState() method to check its state or structure
    const state = store.getState();
    
    // Add assertions to verify the store configuration
    // For example, you can check the initial state or reducer names
    expect(state).toBeDefined(); // Ensure the state is defined
    expect(state).toEqual({});
    expect(store.dispatch).toBeDefined(); // Check if dispatch function is defined
    expect(store.subscribe).toBeDefined();
    
  });
});
