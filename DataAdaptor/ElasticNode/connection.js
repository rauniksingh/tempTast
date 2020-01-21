const { Client } = require('elasticsearch')
const client = new Client({ node: 'localhost:9200', log: 'error' })

class ElasticStack {
  async _getData (req, res) {
    try {
      const from = req.params.from || 0

      const search = function search (index, body) {
        return client.search({ index: index, body: body })
      }

      
    } catch (error) {
      console.log(error)
    }
  };
};

module.exports = new ElasticStack()
