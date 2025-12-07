exports.welcomeEmailTemplate = (email, name) => {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Welcome to TaskTracker</title>
  <style>
    /* Reset for consistent rendering in many email clients */
    html,body { margin:0; padding:0; background:#f7fafc; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    img { border:0; display:block; line-height:100%; outline:none; text-decoration:none; max-width:100%; height:auto; }
    a { color:inherit; text-decoration:none; }
    table { border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; }

    /* Mobile friendly */
    @media only screen and (max-width:600px) {
      .container { width:100% !important; padding:20px !important; }
      .hero { padding:28px 20px !important; }
      .stack { display:block !important; width:100% !important; }
      .profile { width:64px !important; height:64px !important; font-size:20px !important; }
      .h1 { font-size:22px !important; }
      .p { font-size:15px !important; }
      .cta { padding:12px 18px !important; font-size:16px !important; }
    }

    /* Desktop */
    .container { width:600px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; }
    .outer { padding:32px; background:linear-gradient(180deg,#fcfdff,#f7fbff); }
    .brand { display:flex; align-items:center; gap:14px; }
    .logo { width:56px; height:56px; border-radius:12px; display:inline-flex; align-items:center; justify-content:center; font-weight:700; color:#fff; font-size:22px; }
    .title { font-size:18px; color:#0f172a; margin:0; }
    .sub { color:#475569; margin:0; font-size:13px; }

    .hero { padding:36px; text-align:center; }
    .badge { display:inline-block; padding:10px 14px; border-radius:10px; font-weight:700; color:#fff; font-size:16px; }
    .h1 { margin:18px 0 8px 0; font-size:26px; color:#0f172a; }
    .lead { margin:0 auto 18px auto; max-width:520px; color:#334155; font-size:16px; line-height:1.5; }

    .grid { display:flex; gap:16px; align-items:stretch; justify-content:center; margin:20px 0; flex-wrap:wrap; }
    .card { background:#fff; border-radius:10px; box-shadow:0 6px 18px rgba(15,23,42,0.06); padding:18px; width:180px; text-align:center; }
    .card h3 { margin:8px 0 6px 0; font-size:16px; color:#0f172a; }
    .card p { margin:0; color:#475569; font-size:13px; }

    .cta { display:inline-block; background:linear-gradient(90deg,#ff6b6b,#ff8a5c); color:#fff; padding:14px 22px; border-radius:10px; font-weight:700; font-size:17px; text-decoration:none; box-shadow:0 6px 18px rgba(255,106,106,0.18); }

    .meta { margin-top:22px; color:#64748b; font-size:13px; text-align:center; }

    .footer { background:#f1f5f9; padding:22px; text-align:center; color:#94a3b8; font-size:13px; }
    .small { font-size:12px; color:#94a3b8; margin-top:8px; }

    /* Strong accent colors (light background) */
    .brand .logo { background: linear-gradient(135deg,#06b6d4,#4f46e5); }
    .badge { background:linear-gradient(90deg,#06b6d4,#4f46e5); }
    .task-count { font-size:28px; font-weight:800; color:#0f172a; }
  </style>
</head>
<body>
  <center style="width:100%; background:#eef2f7; padding:28px 12px;">
    <table role="presentation" width="100%" style="max-width:720px; margin:0 auto;">
      <tr>
        <td align="center">

          <!-- Card container -->
          <table role="presentation" class="container" style="width:100%; background:#fff;">
            <tr>
              <td class="outer">

                <!-- Brand header -->
                <table role="presentation" width="100%" style="margin-bottom:8px;">
                  <tr>
                    <td style="padding:6px 0;">
                      <div class="brand" style="display:flex;align-items:center;gap:14px;">
                        <div class="logo" style="background:linear-gradient(135deg,#06b6d4,#4f46e5); width:56px; height:56px; border-radius:12px;">
                          <span style="display:block; color:#fff; font-weight:800; font-family:Arial, sans-serif;">TT</span>
                        </div>
                        <div style="display:flex;flex-direction:column;">
                          <p class="title" style="margin:0; font-family:Arial, sans-serif;">TaskTracker</p>
                          <p class="sub" style="margin:0; font-family:Arial, sans-serif;">Powerful. Simple. Productive.</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>

                <!-- Hero -->
                <div class="hero" style="padding:36px;">
                  <div style="display:flex; justify-content:center;">
                    <div class="badge" style="background:linear-gradient(90deg,#06b6d4,#4f46e5);">WELCOME</div>
                  </div>

                  <h1 class="h1" style="font-family: Arial, sans-serif;">Welcome aboard, ${name} 👋</h1>

                  <p class="lead" style="font-family: Arial, sans-serif;">
                    You’re all set! TaskTracker helps you plan, prioritize, and finish tasks faster with clean lists, smart reminders, and a powerful dashboard.
                    Below are a few quick ways to get started.
                  </p>

                  <!-- Quick action CTA -->
                  <a class="cta" href="${process.env.APP_URL || '#'}" style="font-family: Arial, sans-serif;">Open your TaskTracker</a>

                  <!-- Summary grid -->
                  <div class="grid" style="margin-top:22px;">
                    <div class="card" style="width:200px;">
                      <div style="font-size:13px; color:#94a3b8;">Your Projects</div>
                      <h3 style="margin-top:8px; margin-bottom:6px;">0 Projects</h3>
                      <p>Create projects to group tasks and goals.</p>
                    </div>

                    <div class="card" style="width:200px;">
                      <div style="font-size:13px; color:#94a3b8;">Tasks Today</div>
                      <h3 style="margin-top:8px; margin-bottom:6px;" class="task-count">0</h3>
                      <p>Use quick add to capture your tasks.</p>
                    </div>

                    <div class="card" style="width:200px;">
                      <div style="font-size:13px; color:#94a3b8;">Reminders</div>
                      <h3 style="margin-top:8px; margin-bottom:6px;">Enabled</h3>
                      <p>Never miss a deadline with smart reminders.</p>
                    </div>
                  </div>

                  <div style="margin-top:20px; text-align:left; max-width:520px; margin-left:auto; margin-right:auto;">
                    <h3 style="margin:0 0 8px 0; font-family:Arial, sans-serif; color:#0f172a;">Pro tip</h3>
                    <p class="p" style="margin:0; font-family:Arial, sans-serif; color:#334155;">
                      Start by creating a project and add 3 high-priority tasks. Use the priority flags to focus on what matters — the dashboard will surface your top items.
                    </p>
                  </div>

                  <p class="meta" style="margin-top:24px;">
                    If you didn't create an account, you can ignore this email or contact support at
                    <a href="mailto:support@tasktracker.app" style="color:#06b6d4;">support@tasktracker.app</a>.
                  </p>
                </div>

                <!-- Footer small actions -->
                <div style="padding:0 8px 8px 8px; text-align:center;">
                  <table role="presentation" width="100%">
                    <tr>
                      <td style="text-align:center;">
                        <a href="${process.env.APP_URL || '#/settings'}" style="display:inline-block; margin:6px 8px; padding:8px 12px; border-radius:8px; font-size:13px; background:#eef2ff; color:#334155; text-decoration:none;">Set up profile</a>
                        <a href="${process.env.APP_URL || '#/tutorial'}" style="display:inline-block; margin:6px 8px; padding:8px 12px; border-radius:8px; font-size:13px; background:#fff7ed; color:#334155; text-decoration:none;">Getting started</a>
                      </td>
                    </tr>
                  </table>
                </div>

              </td>
            </tr>

            <!-- subtle footer area -->
            <tr>
              <td class="footer" style="background:#f1f5f9; padding:18px; text-align:center;">
                <div style="font-size:13px; color:#64748b;">You’re receiving this because you created an account on TaskTracker.</div>
                <div class="small" style="margin-top:8px;">
                  © ${new Date().getFullYear()} TaskTracker · 123 Productivity Ave · Web
                </div>
                <div style="margin-top:8px;">
                  <a href="${process.env.APP_URL || '#/privacy'}" style="color:#94a3b8; text-decoration:none; margin:0 8px;">Privacy</a> ·
                  <a href="${process.env.APP_URL || '#/terms'}" style="color:#94a3b8; text-decoration:none; margin:0 8px;">Terms</a>
                </div>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>
  </center>
</body>
</html>`;
};
