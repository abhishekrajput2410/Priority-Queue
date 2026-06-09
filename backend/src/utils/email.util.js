const sendEmail = async ({ to, subject, text }) => {
  // In production, connect to SMTP provider. Here we only log for simulation.
  // Replace this method with a real email provider integration.
  // eslint-disable-next-line no-console
  console.info(`[Email] To: ${to}, Subject: ${subject}`);
  // Return simulated success
  return { to, subject, text };
};

module.exports = { sendEmail };
