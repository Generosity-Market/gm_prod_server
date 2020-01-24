module.exports = {
    "hooks": {
        "pre-commit": "npm run lint-staged",
        "pre-push": "npm run lint && npm test -- --verbose"
    }
};