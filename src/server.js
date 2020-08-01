const app = require('../app');
const cfenv = require('cfenv');

const appEnv = cfenv.getAppEnv();

app.listen(appEnv.port, '0.0.0.0');