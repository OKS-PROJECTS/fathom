export const THEME_KEY = "fathom-theme";

/** Inline script run before paint to restore the saved theme. */
export const THEME_INIT = `try{var t=localStorage.getItem('${THEME_KEY}');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.setAttribute('data-theme','dark')}catch(e){}`;
