if ('serviceWorker' in navigator) { // registers a serwice worker || BIZA
    navigator.serviceWorker.register('sw.js?ver=21')
      .then((reg) => console.log('SW registered', reg))
      .catch((err) => console.log('SW not registered', err));
  }