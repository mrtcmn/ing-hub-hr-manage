# Localization Setup for Lit Element Starter

This project has been configured with runtime localization using `@lit/localize` package.

## Features

- **Runtime Localization**: Switch languages without page refresh
- **Multiple Locales**: Currently supports English (en) and Turkish (tr)
- **Persistent Language Selection**: Language choice is saved in localStorage
- **Fallback Support**: Falls back to English if a locale fails to load

## Supported Locales

- **English (en)**: Default language
- **Turkish (tr)**: Secondary language

## How to Use

### 1. Language Switcher

The application includes a language switcher in the top navigation bar:
- **EN**: Switch to English
- **TR**: Switch to Turkish

### 2. Adding New Text

To add new localized text:

1. Add the key to `src/locales/en.js`:
```javascript
export const messages = {
  // ... existing messages
  'new_key': 'New Text in English'
};
```

2. Add the translation to `src/locales/tr.js`:
```javascript
export const messages = {
  // ... existing messages
  'new_key': 'Yeni Türkçe Metin'
};
```

3. Use in your components:
```javascript
import { getMessage } from '../utils/localization.js';

// In your render method
return html`<div>${getMessage('new_key')}</div>`;
```

### 3. Adding New Locales

To add a new locale (e.g., German):

1. Create `src/locales/de.js`:
```javascript
export const messages = {
  'home': 'Startseite',
  'users': 'Benutzer',
  // ... translate all messages
};
```

2. Update `src/locales/en.js`:
```javascript
export const {getLocale, setLocale} = configureLocalization({
  sourceLocale: 'en',
  targetLocales: ['tr', 'de'], // Add 'de'
  loadLocale: (locale) => import(`./${locale}.js`),
});

export const locales = ['en', 'tr', 'de']; // Add 'de'
```

3. Add the language button to `src/root.element.js`:
```javascript
<button 
    class="locale-btn ${this.currentLocale === 'de' ? 'active' : ''}"
    @click=${() => this.changeLocale('de')}
>
    DE
</button>
```

## Available Localization Functions

### `getMessage(key, defaultValue)`
Gets a localized message by key. Falls back to the default value if the key is not found.

### `formatMessage(key, ...args)`
Formats a message with placeholders. Supports simple `{0}`, `{1}` style placeholders.

### `setMessages(messages)`
Sets the current message set (used internally).

### `getCurrentLocale()`
Gets the currently active locale.

## NPM Scripts

- `npm run localize:extract`: Extract messages from source code
- `npm run localize:build`: Build localized versions
- `npm run localize:build:watch`: Build localized versions in watch mode

## File Structure

```
src/
├── locales/
│   ├── en.js          # English messages + localization config
│   └── tr.js          # Turkish messages
├── utils/
│   └── localization.js # Localization utility functions
└── root.element.js     # Main app with language switcher
```

## How It Works

1. **Initialization**: The app loads with English as default
2. **Locale Loading**: When switching languages, the new locale file is dynamically imported
3. **Message Switching**: The `setMessages()` function updates the current message set
4. **Component Updates**: Components automatically re-render with new text via `getMessage()`
5. **Persistence**: Selected language is saved in localStorage

## Best Practices

1. **Always use message keys**: Don't hardcode text in components
2. **Provide fallbacks**: Use meaningful default values for `getMessage()`
3. **Keep keys descriptive**: Use clear, hierarchical key names
4. **Test all locales**: Ensure all supported languages work correctly
5. **Handle missing translations**: Gracefully fall back to source language

## Troubleshooting

### Language not switching
- Check browser console for import errors
- Verify locale file exists and exports correctly
- Check that `setLocale()` is being called

### Missing translations
- Ensure all message keys exist in all locale files
- Check for typos in message keys
- Verify import paths are correct

### Performance issues
- Locale files are loaded on-demand (lazy loading)
- Consider preloading frequently used locales
- Monitor bundle sizes for large locale files
