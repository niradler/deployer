const exec = require('child_process').exec;
const services = require('../services');
class Deployment {
     static async deploy(req,res) {
        try {
            const config = await services.getConfig();
            const script =  exec('sh ' + config.PATH,
            (error, stdout, stderr) => {
                if (error !== null) {
                  throw new Error(`deployer: deployment script: ${error}`);
                }
            });
            script.stdout.pipe(process.stdout);
            return res.json('deployment script running!')
        } catch (error) {
            console.error(error)
            return res.json('deployment failed!')
        }

    }
}

module.exports = Deployment;
