import { program } from 'commander'
import pull from './pull'
import push from './push'
import init from './init'
import ping from './ping'
const packageJson = require('../package.json')

// Commandline arguments
program
  .version(packageJson.version)
//    .option('-ad --allow-delete', 'Allow delete local files(pull) / remote articles(push).')
//    .option('--force', 'In case of collision, adopt remote article(pull) / localfiles(push).')
//    .option('--dry-run', 'Check only message. (Never update and delete local files and remote articles).')

program
  .command('init')
  .description('Register credentials to ".gimonfu.json".')
  .action(init)

program
  .command('pull')
  .description('Download and update local files.')
  .action(pull)

program
  .command('push')
  .description('Upload and update remote articles.')
  .action(push)

program
  .command('ping')
  .description('Try connection to Hatena-blog AtomPub API server with credentials.')
  .action(ping)


program.parse(process.argv)
