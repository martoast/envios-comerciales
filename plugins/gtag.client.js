// plugins/gtag.client.js
export default defineNuxtPlugin((nuxtApp) => {
  const { gtagId } = useRuntimeConfig().public;

  if (!gtagId) {
    console.warn('Google Analytics ID is not defined');
    return;
  }
  
  window.dataLayer = window.dataLayer || [];
  
  function gtag() {
    window.dataLayer.push(arguments);
  }
  
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", gtagId, {
    page_path: window.location.pathname,
  });
  
  useHead({
    script: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${gtagId}`,
        async: true,
      },
    ],
  });
});