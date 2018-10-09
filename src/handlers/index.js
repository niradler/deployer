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
      return `Config file initialize, script path:${config.PATH}, to access the remote deployment \nCreate HTTP GET request to http://yourip:${PORT}/deploy?appKey=${config.APP_KEY}`;
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
  run: (args) => new Promise((resolve,reject)=>{//nohup node server/index.js
    exec('node server/index.js', (error, stdout, stderr) => {
      console.log(error,stdout,stderr)
      if (error !== null) {
        reject(error);
      }
      resolve(stdout)
    });
  })
}

module.exports = h;
