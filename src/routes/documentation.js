const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json');
const users = require('../docs/users.json');
const causes = require('../docs/causes.json');

const router = express.Router();

/**
 * Documentation Routes
 */

router.get('/', swaggerUi.setup({
    ...swaggerDocument,
    paths: {
        ...users.paths,
        ...causes.paths,
    },
    definitions: {
        ...users.definitions,
        ...causes.definitions,
    },
}));

module.exports = router;
