var fs = require('fs');
const crypto = require('crypto');

const s = {};

s.generateKey = () => crypto.randomBytes(20).toString('hex');

s.getConfig = (filename) => new Promise((resolve,reject)=> {
    fs.readFile(filename || './deployer.config.json', 'utf8', (err, data) =>{
       if(err) reject(err);

       resolve(JSON.parse(data))
    });
})

s.setConfig = (key,value) => new Promise((resolve,reject)=> {
  s.getConfig().then(config=>{
    config[key] = value;
    config['UPDATED_AT'] = new Date();
    fs.writeFile('./deployer.config.json', JSON.stringify(config), (err) =>{
      if(err) reject(err);

     resolve(config)
  });
  })
})

s.hardReset = () => new Promise((resolve,reject)=> {
  const config = {"PORT":"8686","APP_KEY":"","PATH":"","UPDATED_AT":""};
    fs.writeFile('./deployer.config.json', JSON.stringify(config), (err) =>{
      if(err) reject(err);

     resolve(config)
  })
})

module.exports = s;
