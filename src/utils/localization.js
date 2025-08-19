import {getLocale} from '../locales/en.js';

let currentMessages = {};

export function setMessages(messages) {
  currentMessages = messages;
}

export function getMessage(key, defaultValue = key) {
  return currentMessages[key] || defaultValue;
}

export function getCurrentLocale() {
  return getLocale();
}

export function formatMessage(key, ...args) {
  let message = getMessage(key, key);
  
  // Simple placeholder replacement
  args.forEach((arg, index) => {
    message = message.replace(`{${index}}`, arg);
  });
  
  return message;
}
