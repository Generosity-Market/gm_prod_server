const fb = {
    link_src: 'https://www.facebook.com/GenerosityMarket/',
    image_src: 'https://s3.amazonaws.com/generosity-market-mail-assets/iconmonstr-facebook-5-48.png',
};
const ig = {
    link_src: 'https://www.instagram.com/generositymarket/',
    image_src: 'https://s3.amazonaws.com/generosity-market-mail-assets/iconmonstr-instagram-15-48.png',
};
const tw = {
    link_src: 'https://twitter.com/generositymarkt',
    image_src: 'https://s3.amazonaws.com/generosity-market-mail-assets/iconmonstr-twitter-5-48.png',
};

const iconLink = (icon) => (
    `<a
        href=${icon.link_src}
        target="_blank"
        rel="no-follow"
        class="social_links"
    >
        <img src=${icon.image_src} />
    </a>`
);

module.exports = {
    facebook: iconLink(fb),
    instagram: iconLink(ig),
    twitter: iconLink(tw),
};
