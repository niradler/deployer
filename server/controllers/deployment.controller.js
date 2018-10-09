const exec = require('child_process').exec;
const services = require('../Sevices');
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
            return res.json('deployed!')
        } catch (error) {
            console.log(error)
            return res.json('deployment failed!')
        }
       
    }
}

module.exports = Deployment;