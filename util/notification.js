const request = require('request-promise')
	  const envConfig = require('../Server.js')

module.exports = {
  async _StoreErrorlogs (req, error, scope) {
    let level = 'high'
    if (req.res.statusCode >= 500) {
      level = 'critical'
    }

    const dataObj = {
      logType: 'error',
      level: level,
      token: req.headers.authorization || '',
      requestId: req.id,
      requestBody: req.body || {},
      requestQs: req.query || {},
      requestParams: req.params || {},
      requestIp: req.headers.host,
      port: envConfig.server.port,
      appUrl: envConfig.server.baseUrl,
      serverMessage: req.res.statusMessage,
      serverStatusCode: req.res.statusCode,
      errorMessage: error,
      scope: scope,
      pathNorm: req.baseUrl,
      path: req._parsedUrl.pathname,
      service: 'user_audit_services'
    }

    const options = {
      method: 'POST',
      json: true,
      url: `${process.env._AUDIT_URL_}/api/v1/audit`,
      body: dataObj
    }

    // try {
    //   await request(options)
    // } catch (error) {
    //   console.log(error)
    // }
  }
};


