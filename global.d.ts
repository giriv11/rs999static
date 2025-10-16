// Global type declarations

interface QuoteFormAPI {
  open(): void;
  close?(): void;
}

interface Window {
  QuoteForm?: QuoteFormAPI;
}

declare let window: Window & typeof globalThis;
