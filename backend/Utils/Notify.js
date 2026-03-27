// Helper de notificacion
const injectNotifier = (fn) => {
  notifyPreviousSession = fn;
};

module.exports = { injectNotifier };
