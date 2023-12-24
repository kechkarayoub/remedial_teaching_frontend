import { clear, get, remove, set } from 'services/storage';

describe('Storage functions', () => {
  test('Test get', () => {
    expect(get("key")).toBeUndefined();
    expect(get("current_language")).toBe("fr");    
  });
  test('Test set', () => {
    expect(get("key")).toBeUndefined();
    set("key", "value");
    expect(get("key")).toBe("value");
    set("current_language", "ar");
    expect(get("current_language")).toBe("ar");    
  });
  test('Test remove', () => {
    expect(get("key2")).toBeUndefined();
    set("key2", "value2");
    expect(get("key2")).toBe("value2");
    remove("key2");
    expect(get("key2")).toBeUndefined();
  });
  test('Test clear', () => {
    expect(get("key3")).toBeUndefined();
    set("key3", "value3");
    expect(get("key3")).toBe("value3");
    set("current_language", "ar");
    expect(get("current_language")).toBe("ar"); 
    clear();
    expect(get("key3")).toBeUndefined();
    expect(get("current_language")).toBe("fr");  
  });
});
