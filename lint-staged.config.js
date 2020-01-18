module.exports = {
    '*.{js,jsx}': [
        'eslint ./ --fix',
        'git add',
        'npm run test -- --bail --findRelatedTests',
    ],
};
