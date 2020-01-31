const fetch = require('node-fetch');

exports.fetchJSON = async (url, options) => {
    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.error) {
            return { error: json.error };
        }

        return { ...json };
    } catch (error) {
        return { error };
    }
};
