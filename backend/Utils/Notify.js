let notifyPreviousSession;

const injectNotifier = (fn) => {
  notifyPreviousSession = fn;
};

module.exports = {
  injectNotifier,
  notifyPreviousSession: (userId) => notifyPreviousSession?.(userId),
};
