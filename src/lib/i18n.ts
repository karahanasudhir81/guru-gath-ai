import { useEffect, useState } from "react";

export const LANGUAGES = [
  { code: "en", label: "English", native: "English", greeting: "Welcome", script: "Namaste" },
  { code: "hi", label: "Hindi", native: "हिन्दी", greeting: "स्वागत है", script: "नमस्ते" },
  { code: "ta", label: "Tamil", native: "தமிழ்", greeting: "வரவேற்கிறோம்", script: "வணக்கம்" },
  { code: "te", label: "Telugu", native: "తెలుగు", greeting: "స్వాగతం", script: "నమస్కారం" },
  { code: "bn", label: "Bengali", native: "বাংলা", greeting: "স্বাগতম", script: "নমস্কার" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

const KEY = "vidyaai.lang";
const EVENT = "vidyaai:lang";

export function getLanguage(): LanguageCode {
  if (typeof window === "undefined") return "en";
  const v = window.localStorage.getItem(KEY) as LanguageCode | null;
  return v && LANGUAGES.some((l) => l.code === v) ? v : "en";
}

export function setLanguage(code: LanguageCode) {
  window.localStorage.setItem(KEY, code);
  window.dispatchEvent(new CustomEvent(EVENT, { detail: code }));
}

export function useLanguage() {
  const [lang, setLang] = useState<LanguageCode>("en");
  useEffect(() => {
    setLang(getLanguage());
    const onChange = (e: Event) => setLang((e as CustomEvent<LanguageCode>).detail);
    window.addEventListener(EVENT, onChange);
    return () => window.removeEventListener(EVENT, onChange);
  }, []);
  const meta = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];
  return { lang, meta, setLanguage };
}

/** BCP-47 tags used by the Web Speech API. */
export const SPEECH_LOCALES: Record<LanguageCode, string> = {
  en: "en-IN",
  hi: "hi-IN",
  ta: "ta-IN",
  te: "te-IN",
  bn: "bn-IN",
};
