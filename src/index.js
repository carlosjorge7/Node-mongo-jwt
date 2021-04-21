const app = require('./app');
require('./db');

app.set('port', process.env.PORT || 3000);

async function init() {
    await app.listen(app.get('port'));
    console.log('Server on port', app.get('port'));
}

init();