const exec = require('child_process').exec;
const services = require('../services');
class Deployment {
     static async deploy(req,res) {
        try {
            const config = await services.getConfig();
            const script =  exec('sh ./deploy.sh',
            (error, stdout, stderr) => {
                console.log(`${stdout}`);
                if (error !== null) {
                    console.log(`exec error: ${error}`);
                }
            });
            script.stdout.pipe(process.stdout);
            return res.json('deployment script running!')
        } catch (error) {
            console.log(error)
            return res.json('deployment failed!')
        }

    }
}

module.exports = Deployment;
