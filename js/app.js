if ('serviceWorker' in navigator) { // registers a serwice worker || BIZA
    navigator.serviceWorker.register('sw.js')
      .then((reg) => console.log('SW registered', reg))
      .catch((err) => console.log('SW not registered', err));
  }