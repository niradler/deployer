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
  },
  port: async(flags) => {
    try {
      const port = flags.port;
      await helpers.setConfig('PORT', port);
      const config = await helpers.getConfig();
      return config;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

h.argsMap = {
  reset: async(args) => {
    try {
      const config = await helpers.hardReset();
      return config;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  config: async(args) => {
    try {
      const config = await helpers.getConfig();
      return config;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  run: (args) => new Promise((resolve,reject)=>{
    const script = exec('sudo npm i -g pm2 && pm2 start server/index.js', (error, stdout, stderr) => {
      if (error !== null) {
        reject(error);
      }
      resolve(stdout)
    });
    script.stdout.pipe(process.stdout);
  }),
  service: (args) => new Promise((resolve,reject)=>{
    const script = exec('sudo cp ./deployer.service /etc/systemd/system && systemctl start deployer && journalctl -u deployer', (error, stdout, stderr) => {
      if (error !== null) {
        reject(error);
      }
      resolve(stdout)
    });
    script.stdout.pipe(process.stdout);
  })
}

module.exports = h;
