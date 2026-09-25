import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 },
      );
    }

    // Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Theme Hex Colors
    const theme = {
      primary: "#864dcb",
      accent: "#fd4b8c",
      subtext: "#888888",
    };

    // Mail to me
    const ownerMailOptions = {
      from: `"Portfolio Contact Form" <${process.env.SMTP_EMAIL}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      replyTo: email,
      subject: `New Portfolio Message from ${name}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Client Message</title>
</head>
<body style="margin: 0; padding: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 580px; text-align: left;">
          
          <!-- Header -->
          <tr>
            <td style="padding: 10px 0 16px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-left: 1px solid ${theme.primary}; padding-left: 14px;">
                    <span style="color: ${theme.accent}; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">
                      New Portfolio Message
                    </span>
                    <h1 style="margin: 4px 0 0 0; font-size: 20px; font-weight: 700; line-height: 1.3;">
                      You've Received a New Message
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Sender Details Box -->
          <tr>
            <td style="padding: 8px 0 12px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: rgba(134, 77, 203, 0.08); border-radius: 8px;">
                <tr>
                  <td style="padding: 12px 16px;">
                    <p style="margin: 0 0 6px 0; font-size: 13px;">
                      <strong style="color: ${theme.primary};">Name:</strong> ${name}
                    </p>
                    <p style="margin: 0; font-size: 13px;">
                      <strong style="color: ${theme.primary};">Email:</strong> 
                      <a href="mailto:${email}" style="color: ${theme.accent}; text-decoration: none; font-weight: 600;">
                        ${email}
                      </a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Content Box -->
          <tr>
            <td style="padding: 0 0 16px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: rgba(134, 77, 203, 0.08); border-radius: 8px;">
                <tr>
                  <td style="padding: 14px 16px;">
                    <div style="color: ${theme.primary}; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 6px;">
                      Message
                    </div>
                    <div style="font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Direct Reply Note (Centered) -->
          <tr>
            <td style="padding-bottom: 20px; text-align: center;">
              <p style="margin: 0; color: ${theme.subtext}; font-size: 12px; line-height: 1.5;">
                💡 You can reply directly to this email.
              </p>
            </td>
          </tr>

          <!-- Footer (Centered) -->
          <tr>
            <td style="padding-top: 14px; border-top: 1px solid rgba(150, 150, 150, 0.2); text-align: center;">
              <p style="margin: 0 0 2px 0; font-size: 12px; font-weight: 600; color: ${theme.primary};">
                Biswanath Sarker | Portfolio
              </p>
              <p style="margin: 0; color: ${theme.subtext}; font-size: 11px;">
                Automated notification from your portfolio website contact form.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
  `,
    };

    // Auto-Confirmation email to sender
    const clientMailOptions = {
      from: `"Biswanath Sarker" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: `Thank you for reaching out, ${name}!`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Confirmation Mail</title>
</head>
<body style="margin: 0; padding: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 580px; text-align: left;">
          
          <!-- Header with 1px Left Primary Border -->
          <tr>
            <td style="padding: 10px 0 16px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-left: 1px solid ${theme.primary}; padding-left: 14px;">
                    <span style="color: ${theme.accent}; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">
                      Confirmation
                    </span>
                    <h1 style="margin: 4px 0 0 0; font-size: 20px; font-weight: 700; line-height: 1.3;">
                      Thank You for Reaching Out
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding-bottom: 14px;">
              <p style="margin: 0; font-size: 14px; line-height: 1.6;">
                Hello <strong>${name}</strong>, thank you for contacting me! I have successfully received your message and will review it as soon as possible.
              </p>
            </td>
          </tr>

          <!-- Submitted Message Box -->
          <tr>
            <td style="padding-bottom: 20px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: rgba(134, 77, 203, 0.08); border-radius: 8px;">
                <tr>
                  <td style="padding: 14px 16px;">
                    <div style="color: ${theme.primary}; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 6px;">
                      Your Submitted Message
                    </div>
                    <div style="font-size: 13px; line-height: 1.6; font-style: italic; white-space: pre-wrap;">"${message}"</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Sign-off Block -->
          <tr>
            <td style="padding-bottom: 20px;">
              <p style="margin: 0 0 2px 0; font-size: 13px; color: ${theme.subtext};">Best regards,</p>
              <h3 style="margin: 0 0 2px 0; color: ${theme.accent}; font-size: 15px; font-weight: 700;">Biswanath Sarker</h3>
              <p style="margin: 0; color: ${theme.primary}; font-size: 12px; font-weight: 600;">MERN Stack Web Developer</p>
            </td>
          </tr>

          <!-- Footer (Centered) -->
          <tr>
            <td style="padding-top: 14px; border-top: 1px solid rgba(150, 150, 150, 0.2); text-align: center;">
              <p style="margin: 0 0 2px 0; font-size: 12px; font-weight: 600; color: ${theme.primary};">
                Biswanath Sarker
              </p>
              <p style="margin: 0; color: ${theme.subtext}; font-size: 11px;">
                This is an automated confirmation.
              </p>
              <p style="margin: 0; color: ${theme.subtext}; font-size: 11px;">
                Please do not reply directly to this email.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
  `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(clientMailOptions),
    ]);

    return NextResponse.json(
      { message: "Emails sent successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Nodemailer Error:", error);
    return NextResponse.json(
      { message: "Failed to send email. Please try again later." },
      { status: 500 },
    );
  }
}
