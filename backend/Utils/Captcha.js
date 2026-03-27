const verifyCaptcha = async (captchaToken, remoteIp) => {
  try {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
      console.error("Falta RECAPTCHA_SECRET_KEY en .env del backend");
      return { success: false, "error-codes": ["missing-secret"] };
    }
    if (!captchaToken) {
      return { success: false, "error-codes": ["missing-input-response"] };
    }

    const params = new URLSearchParams();
    params.append("secret", secret);
    params.append("response", captchaToken);
    if (remoteIp) params.append("remoteip", remoteIp);

    const r = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    const data = await r.json();
    return data;
  } catch (e) {
    console.error("Error verificando reCAPTCHA:", e);
    return { success: false, "error-codes": ["verification-failed"] };
  }
};

module.exports = { verifyCaptcha };
