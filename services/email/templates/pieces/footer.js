const socialIcons = require('./socialIcons');

const {
    facebook,
    instagram,
    twitter,
} = socialIcons;

const footerLogo = (
    `
    <div class="footer_logo">
        <img src="https://s3.amazonaws.com/generosity-market-mail-assets/White-Text-Generosity-Logo.png" />
    </div`
);

const htmlFooter = (
    `
    <section class="footer_start">
    </section>
    <section class="sub_footer">
        ${footerLogo}
    </section>
    <footer>
        <p class="social_follow">Follow us</p>
        <table>
            <tr class="social_wrapper">
                <td>
                    ${facebook}
                    ${instagram}
                    ${twitter}
                </td>
            </tr>
        </table>
    </footer>`
);

module.exports = htmlFooter;
