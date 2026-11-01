import "server-only";

export function getContactSubmissionConfig() {
  const config = {
    supabaseUrl: process.env.SUPABASE_URL,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    resendApiKey: process.env.RESEND_API_KEY,
    toEmail: process.env.CONTACT_TO_EMAIL,
    fromEmail: process.env.CONTACT_FROM_EMAIL,
    ipHashSecret: process.env.IP_HASH_SECRET,
  };

  if (
    process.env.CONTACT_SUBMISSIONS_ENABLED !== "true" ||
    Object.values(config).some((value) => !value)
  ) {
    return null;
  }

  const {
    supabaseUrl,
    serviceRoleKey,
    resendApiKey,
    toEmail,
    fromEmail,
    ipHashSecret,
  } = config;

  if (
    !supabaseUrl ||
    !serviceRoleKey ||
    !resendApiKey ||
    !toEmail ||
    !fromEmail ||
    !ipHashSecret
  ) {
    return null;
  }

  return {
    supabaseUrl,
    serviceRoleKey,
    resendApiKey,
    toEmail,
    fromEmail,
    ipHashSecret,
  };
}

export function isContactSubmissionEnabled() {
  return getContactSubmissionConfig() !== null;
}
