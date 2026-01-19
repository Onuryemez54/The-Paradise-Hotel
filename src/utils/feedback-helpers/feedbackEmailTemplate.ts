export const feedbackEmailTemplate = (data: {
  name: string;
  email: string;
  topic: string;
  message: string;
}) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Feedback</title>
</head>
<body style="margin:0;padding:0;background:#162623;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:24px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#264039;border-radius:16px;overflow:hidden;">

          <!-- HEADER -->
          <tr>
            <td style="padding:20px 24px;background:linear-gradient(135deg,#375d52,#6aa091);color:#d9ebe7;">
              <h2 style="margin:0;font-size:20px;">📩 New Feedback Received</h2>
              <p style="margin:8px 0 0;font-size:14px;opacity:.9;">
                <strong>Paradise Hotel Website</strong>
              </p>
            </td>
          </tr>

          <!-- META -->
          <tr>
            <td style="padding:20px 24px;color:#d9ebe7;font-size:14px;">
              <table width="100%" cellpadding="6" cellspacing="0">
                <tr>
                  <td width="120" style="color:#94a3b8;">Topic</td>
                  <td><strong>${data.topic}</strong></td>
                </tr>
                <tr>
                  <td style="color:#94a3b8;">Name</td>
                  <td>${data.name || '-'}</td>
                </tr>
                <tr>
                  <td style="color:#94a3b8;">Email</td>
                  <td>
                    <a href="mailto:${data.email}" style="color:#e67e2c;text-decoration:none;">
                      ${data.email}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="color:#94a3b8;">Date</td>
                  <td>${new Date().toLocaleString()}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- MESSAGE -->
          <tr>
            <td style="padding:20px 24px;background:#264039;">
              <div style="background:#264039;border:1px solid #e67e2c;border-radius:12px;padding:16px;color:#d9ebe7;font-size:14px;line-height:1.6;">
                ${data.message.replace(/\n/g, '<br />')}
              </div>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:16px 24px;text-align:center;color:#e67e2c;font-size:12px;">
              This message was sent from the feedback form on the Paradise Hotel website.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
};
