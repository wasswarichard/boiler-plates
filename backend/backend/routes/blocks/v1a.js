const router = require('express').Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const getBlocks = require('../../controllers/blocks').getBlocks;
const getBlockDetails = require('../../controllers/blocks').getBlockDetails;

router.get('/v1a/blocks', (request, response) => {
    getBlocks()
        .then(blocks => {
            response.writeHead(200);
            return response.end(JSON.stringify(blocks))
        })
        .catch(error => {
            response.status(400).send(error)
        })
})

router.get('/v1a/blocks/:id', (request, response) => {
    getBlockDetails(request.params.id)
        .then(details => {
            response.writeHead(200);
            return response.end(JSON.stringify(details))
        })
        .catch(error => response.status(400).send(error))
})

module.exports = router;