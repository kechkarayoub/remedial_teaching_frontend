import i18next from 'i18n_init'; 

describe('I18next configuration', () => {
  it('Should be initialized with resources', () => {
    // Verify that i18next is initialized
    expect(i18next.isInitialized).toBe(true);

    // Verify that resources are loaded correctly for the languages ('ar', 'en' and 'fr)
    expect(i18next.options.resources).toHaveProperty('ar');
    expect(i18next.options.resources).toHaveProperty('en');
    expect(i18next.options.resources).toHaveProperty('fr');
  });

  it('Should have valid translations loaded', () => {
    // Verify that translations are loaded and contain some keys
    const translations_ar = i18next.getResourceBundle('ar', 'translations');
    expect(translations_ar).toBeDefined();
    expect(Object.keys(translations_ar).length).toBeGreaterThan(0);
    const translations_en = i18next.getResourceBundle('en', 'translations');
    expect(translations_en).toBeDefined();
    expect(Object.keys(translations_en).length).toBeGreaterThan(0);
    const translations_fr = i18next.getResourceBundle('fr', 'translations');
    expect(translations_fr).toBeDefined();
    expect(Object.keys(translations_fr).length).toBeGreaterThan(0);

    expect(Object.keys(translations_ar).length).toBe(Object.keys(translations_en).length);
    expect(Object.keys(translations_ar).length).toBe(Object.keys(translations_fr).length);
  });

  it('Should have the correct language set', () => {
    // Verify that the language is set correctly
    const currentLanguage = i18next.language;
    expect(currentLanguage).toBeDefined();
    expect(['en', 'fr', 'ar']).toContain(currentLanguage);
    expect(currentLanguage).toBe("fr");
  });

});
