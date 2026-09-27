// Runs before the page paints (see app/layout.tsx), so there is no flash of the
// wrong theme. The preference is "system", "light" or "dark"; with "system" the
// theme follows the OS setting, also when it changes while the page is open.
// `?theme=dark|light` overrides it, which the screenshot job uses.
export const themeScript = `(function(){try{var d=document.documentElement,m=matchMedia("(prefers-color-scheme: dark)");window.__applyTheme=function(){var p=new URLSearchParams(location.search).get("theme")||localStorage.getItem("theme")||"system";d.dataset.themePref=p;d.classList.toggle("dark",p==="dark"||(p==="system"&&m.matches))};window.__applyTheme();m.addEventListener("change",window.__applyTheme)}catch(e){}})()`;
