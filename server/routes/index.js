const router = require('express').Router();
const DeploymentController = require('../controllers/deployment.controller');

router.get('/deploy', DeploymentController.deploy);


module.exports = router;