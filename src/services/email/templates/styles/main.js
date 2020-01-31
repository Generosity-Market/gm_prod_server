const appColors = require('./colors');

const {
    green,
    gray,
    white,
} = appColors;

const htmlStyles = (
    `* {
        margin: 0;
        padding: 0;
    }
    
    body {
        background-color: ${gray.medium};
    }

    .wrapper {
        background-color: ${white};
        border: 1px solid ${gray.light};
        color: ${gray.text};
        margin: 3rem auto;
        overflow: hidden;
        text-align:center;
        width: 85%;
        max-width: 600px;
    }
    
    header {
        background-color: ${white};
        padding: 1rem;
    }

    header td {
        text-align: center;
        vertical-align: middle;
        width: 50%;
    }

    header td img {
        width: 40%;
    }

    .main_content {
        background-color: ${gray.lightest};
        padding: 2.5rem 1rem;
    }

    .footer_start {
        background-color: ${green.light};
        min-height: 50px;
    }

    .sub_footer {
        background-color: ${green.medium};
        min-height: 50px;
    }
    
    .footer_logo {
        padding: 1.5rem;
    }

    .footer_logo img {
        width: 40%;
    }

    footer {
        background-color: ${green.dark};
        min-height: 100px;
    }

    .social_follow {
        color: ${white};
        text-transform: uppercase;
        padding-top: 1.5rem;
    }

    footer table {
        margin: 0 auto;
        width: 50%;
    }

    .social_wrapper td {
        text-align: center;
        vertical-align: middle;
        width: 100%;
    }

    .social_links img {
        margin: 1rem;
        max-width: 30px;
        max-height: 30px;
    }`
);

const mobileStyles = (
    `
    @media only screen and (max-width: 600px) {

        .wrapper {
            border: none;
            margin: 0;
            width: 100%;
        }

        header td img {
            width: 50%;
        }

        .footer_logo img {
            width: 60%;
        }

        footer table {
            width: 100%;
        }

        .social_wrapper img {
            max-height: 35px;
            max-width: 35px;
        }

    }`
);

module.exports = htmlStyles + mobileStyles;
