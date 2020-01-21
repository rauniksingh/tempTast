const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const chalk = require('chalk')

class Cluster {
  constructor () {
    if (cluster.isMaster) {
      console.log(chalk.blue.bgRed.bold(` [ ✓ ] Master ${process.pid} is running`))
      // Fork workers.
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
      }

      cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`)
      })
    } else {
      console.log(chalk.white(` [ ✓ ] Worker ${process.pid} started`))
    }
  };
};

module.exports = new Cluster()
