const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendVerificationEmail = async (email, code) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verification Code',
      html: `
        <h1>Your Verification Code</h1>
        <p>Your verification code is: <strong>${code}</strong></p>
        <p>This code will expire in 10 minutes.</p>
      `,
    });
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send verification email');
  }
};

/**
 * Send product licenses to user's email
 * @param {string} email - User's email
 * @param {number} orderId - Order ID
 * @param {Array} products - Array of products with their licenses
 * @returns {Promise<boolean>} - Returns true if email sent successfully
 */
const sendProductLicensesEmail = async (email, orderId, products) => {
  try {
    // Create HTML table for products and licenses
    let productsHtml = products.map(product => `
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;">${product.name}</td>
        <td style="padding: 10px; border: 1px solid #ddd;"><code>${product.licence}</code></td>
      </tr>
    `).join('');

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Your Product Licenses for Order #${orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4a4a4a; border-bottom: 1px solid #eee; padding-bottom: 10px;">Your Product Licenses</h1>
          
          <p>Thank you for your purchase! Below are the licenses for the products you ordered:</p>
          
          <h2 style="color: #4a4a4a; font-size: 18px;">Order #${orderId}</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px; margin-bottom: 20px;">
            <thead>
              <tr style="background-color: #f8f9fa;">
                <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Product</th>
                <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">License Key</th>
              </tr>
            </thead>
            <tbody>
              ${productsHtml}
            </tbody>
          </table>
          
          <p>Please keep these licenses safe as they are required to activate your products.</p>
          
          <p>If you have any questions or concerns, please contact our support team.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #777; font-size: 12px;">
            <p>This is an automated email. Please do not reply to this message.</p>
          </div>
        </div>
      `,
    });
    return true;
  } catch (error) {
    console.error('Error sending license email:', error);
    throw new Error('Failed to send product licenses email');
  }
};

module.exports = {
  sendVerificationEmail,
  sendProductLicensesEmail
}; 