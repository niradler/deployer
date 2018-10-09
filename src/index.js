const {Command, flags} = require('@oclif/command');
const {argsMap, flagsMap} = require('./handlers');

const {
  PORT = 544
} = process.env;

class DeployerCommand extends Command {
  async run() {
    const {flags, args} = this.parse(DeployerCommand);
    try {
      let output = "";
      for (const key in args) {
        if (args[key]) {
          output = await argsMap[args[key]](args)
        }
      }
      for (const key in flags)
        output = await flagsMap[key](flags);

      this.log(output)
    } catch (error) {
      this.error('Deployer Error: ' + error.message);
      this.exit(1)
    }

  }
}

DeployerCommand.description = `Deployer - fast remote run
...
Visit us at https://github.com/niradler/deployer.git
`

DeployerCommand.flags = {
  version: flags.version({char: 'v'}),
  help: flags.help({char: 'h'}),
  path: flags.string({char: 'p', description: 'absolute path to deploy.sh'})
}

DeployerCommand.args = [
  {
    name: 'config',
    description: 'print config file.'
  }, {
    name: 'run',
    description: 'run local server.'
  }
]

module.exports = DeployerCommand
