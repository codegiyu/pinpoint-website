export interface MailTemplateData {
  property: string;
  value: string;
}

export interface MailTemplateProps {
  title: string;
  top: string[][];
  data: MailTemplateData[];
  end: string;
}

export const mailTemplate = ({ title, top, data, end }: MailTemplateProps) => {
  const titleEl = `
    <tr>
      <td width="100%" class="mobile" align="center" valign="middle" style="padding: 0px 40px;">
        <h1>${title}</h1>
      </td>
    </tr>
    <!--== Start Separator ==-->
    <tr>
      <td height="40" style="font-size:10px; line-height:10px;">&nbsp;</td>
    </tr>
    <!--== End Separator ==-->
  `;

  const topEl = top.reduce((acc, curr, idx, arr) => {
    let itemEl = `
      <tr>
        <td width="100%" class="mobile" align="left" valign="middle">
          ${curr.map(str => `<p>${str}</p>`).join('')}
        </td>
      </tr>
    `;

    if (idx < arr.length - 1) {
      itemEl += `
        <!--== Start Separator ==-->
        <tr>
          <td height="15" style="font-size:10px; line-height:10px;">&nbsp;</td>
        </tr>
        <!--== End Separator ==-->
      `;
    }

    acc += itemEl;

    return acc;
  }, '');

  const dataEl = data.reduce((acc, curr, idx, arr) => {
    let itemEl = `
      <!--== Start ${curr.property} Field Item ==-->
      <tr>
        <td width="100%" class="mobile" align="left" valign="middle">
          <h3>${curr.property}: </h3>
          <hr />
          <p>${curr.value}</p>
        </td>
      </tr>
      <!--== End ${curr.property} Field Item ==-->
    `;

    if (idx < arr.length - 1) {
      itemEl += `
        <!--== Start Separator ==-->
        <tr>
          <td height="30" style="font-size:10px; line-height:10px;">&nbsp;</td>
        </tr>
        <!--== End Separator ==-->
      `;
    }

    acc += itemEl;

    return acc;
  }, '');

  const endEl = `
    <tr>
      <td width="100%" class="mobile" align="left" valign="middle" style="padding: 0px 40px 30px;">
        <i style="padding: 0px 0px;">${end}</i>
      </td>
    </tr>
  `;

  const html = `
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html lang="en">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>${title}</title>        

        <!--[if (mso)|(mso 16)]>
        <style type="text/css">
          body, table, td, a, span { font-family: Arial, sans-serif !important; }
          a {text-decoration: none !important;}
        </style>
        <![endif]-->

        <style type="text/css">
          /* CLIENT-SPECIFIC STYLES */
          body,
          table,
          td,
          a {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          }

          table,
          td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
          }

          img {
            -ms-interpolation-mode: bicubic;
          }

          .logo-container {
            background: transparent !important;
          }

          /* RESET STYLES */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
  
          img {
            border: 0;
            outline: none;
            text-decoration: none;
          }

          table {
            border-collapse: collapse !important;
          }

          body {
            color: #777777 !important;
            font-family: Tahoma, Arial, sans-serif !important;
            font-size: 12px;
            font-weight: 400px !important;
            margin: 0 !important;
            padding: 10px !important;
            width: 100% !important;
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          p,
          img {
            margin: 0;
            padding: 0;
          }

          /* iOS BLUE LINKS */
          a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
          }

          /* ANDROID CENTER FIX */
          div[style*="margin: 16px 0;"] {
            margin: 0 !important;
          }

          /* MEDIA QUERIES */
          @media (prefers-color-scheme: dark) {
            .logo-container {
              background: transparent !important;
            }

            .wrapper {
              background: white !important;
              color: #777777 !important;
            }
          }
  
          @media all and (max-width:767px) {
            .wrapper {
              width: 100% !important;
              padding: 0 !important;
            }

            .container {
              width: 300px !important;
              padding: 0 !important;
            }

            .mobile {
              width: 300px !important;
              display: block !important;
              padding: 0 !important;
            }

            .img {
              width: 100% !important;
              height: auto !important;
            }

            *[class="mobileOff"] {
              width: 0px !important;
              display: none !important;
            }

            *[class*="mobileOn"] {
              display: block !important;
              max-height: none !important;
            }
          }

          /*===========================
              Author Custom Style
          ============================*/
          hr{
            border-color: #fefefe;
            border-width: 1px;
            margin-bottom: 10px;
          }

          .message-content{
            font-size: 14px;
            line-height: 1.6;
          }

          .content-wrapper p{
            font-weight: 400;
            font-size: 12px;
          }

          h1 {
            font-weight: 600;
            font-size: 24px !important;
            color: #fe7702;
            text-align: center;
          }

          i {
            color: #fe7702;
          }

          .email-txt a{
            color: #222222 !important;
            text-decoration: none !important;
          }
        </style>
      </head>

      <body style="margin:0; padding: 5px; background-color:#F3F3F3;">
        <center>
          <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#F2F2F2">
            <tr>
              <td align="center" valign="top">

                <!--== TemplateContainer Start ==-->
                <div>
                  <table width="640" cellpadding="0" cellspacing="0" border="0" class="wrapper" bgcolor="#FFFFFF">
                    <tr>
                      <td align="center" valign="top" style="padding: 20px 40px;">
                        <a href="https://wwww.pinpoint.ng/" target="_blank">
                          <div class="logo-container" style="padding: 40px 20px 0px; width: fit-content;">
                            <img 
                              src="https://i.postimg.cc/wM5b51gD/pinpoint-full.png"
                              alt="Pinpoint Global logo"
                              style="height: 25px; margin: 0;"
                            />
                          </div>
                        </a>
                      </td>
                    </tr>

                    <tr>
                      <td height="60" style="font-size:10px; line-height:10px;">&nbsp;</td>
                    </tr>

                    <!--== Content Area Start ==-->

                    <tr class="content-wrapper">
                      ${titleEl}
                      <td align="center" valign="top" style="padding: 20px 40px;">
                        <table cellpadding="0" cellspacing="0" border="0" class="container">
                          ${topEl}
                          <!--== Start Separator ==-->
                          <tr>
                            <td height="30" style="font-size:10px; line-height:10px;">&nbsp;</td>
                          </tr>
                          <!--== End Separator ==-->
                          ${dataEl}
                        </table>
                      </td>
                    </tr>

                    <!--== Content Area End ==-->

                    <tr>
                      <td height="60" style="font-size:10px; line-height:10px;">&nbsp;</td>
                    </tr>
                    ${endEl}
                  </table>
                </div>

                <!--== TemplateContainer End ==-->
              </td>
            </tr>
          </table>
        </center>
      </body>
    </html>`;

  return html;
};
