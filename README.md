deployer
========

run deploy script from remote by http

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/deployer.svg)](https://npmjs.org/package/deployer)
[![Downloads/week](https://img.shields.io/npm/dw/deployer.svg)](https://npmjs.org/package/deployer)
[![License](https://img.shields.io/npm/l/deployer.svg)](https://github.com/niradler/deployer/blob/master/package.json)


# Usage
deployer -p=/user/scripts/deploy.sh // make sure chmod +x deploy.sh
deployer config
sudo deployer run

# Commands
USAGE
  $ deployer [CONFIG] [RUN]

ARGUMENTS
  CONFIG  print config file.
  RUN     run local server.

OPTIONS
  -c, --port=port  change port for the web server.
  -h, --help       show CLI help
  -p, --path=path  absolute path to deploy.sh
  -v, --version    show CLI version

DESCRIPTION
  ...
  Visit us at https://github.com/niradler/deployer.git

