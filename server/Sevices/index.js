var fs = require('fs');

const s = {};

s.getConfig = () => new Promise((resolve,reject)=> {
    fs.readFile('./deployer.config.json', 'utf8', (err, data) =>{
       if(err) reject(err);

       resolve(JSON.parse(data))
    });
})

s.setConfig = (config) => new Promise((resolve,reject)=> {
    fs.writeFile('./deployer.config.json', JSON.stringify(config), (err) =>{
        if(err) reject(err);

       resolve(config)
    });
})

module.exports = s;
