/* eslint-disable indent */
const htmlHeader = require('./pieces/header');
const htmlFooter = require('./pieces/footer');
const htmlStyles = require('./styles/main');

const htmlBody = (
    contentStyles,
    bodyContent,
    mailData,
) => (
        `<html>
            <head>
                <style type="text/css">
                    ${htmlStyles}
                    ${contentStyles}
                </style>
            </head>
            <body>
                <div class="wrapper">
                    ${htmlHeader(mailData)}
                    ${bodyContent(mailData)}
                    ${htmlFooter}
                </div>
            </body>
        </html>`
    );


module.exports = htmlBody;
