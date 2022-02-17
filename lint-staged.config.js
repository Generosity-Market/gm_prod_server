module.exports = {
    '*.{js,jsx}': [
        'eslint ./ --cache --fix',
        'git add',
        'npm run test -- --bail --findRelatedTests',
    ],
};
