const sendEmail = async ({ to, subject, text }) => {
  console.info(`[Email] To: ${to}, Subject: ${subject}`);
  return { to, subject, text };
};

module.exports = { sendEmail };
