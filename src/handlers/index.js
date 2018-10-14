const exec = require('child_process').exec;
const helpers = require('../helpers');
const h = {};
h.flagsMap = {
  path: async(flags) => {
    try {
      const path = flags.path;
      await helpers.setConfig('PATH', path);
      const APP_KEY = helpers.generateKey();
      const config = await helpers.setConfig('APP_KEY', APP_KEY);
      return `Config file initialize, script path:${config.PATH}, to access the remote deployment \nCreate HTTP GET request to http://yourip:${config.PORT}/deploy?appKey=${config.APP_KEY}`;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

h.argsMap = {
  config: async(args) => {
    try {
      const config = await helpers.getConfig();
      return config;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  run: (args) => new Promise((resolve,reject)=>{
    const script = exec('sudo cp ./deployer.service /etc/systemd/system && sudo systemctl start deployer && journalctl -u deployer', (error, stdout, stderr) => {
      if (error !== null) {
        reject(error);
      }
      resolve(stdout)
    });
    script.stdout.pipe(process.stdout);
  })
}

module.exports = h;
