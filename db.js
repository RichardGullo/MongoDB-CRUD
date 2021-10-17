const mongodb = require('mongodb');
const dotenv = require('dotenv');


dotenv.config();

mongodb.MongoClient.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
    let db = client.db();
    module.exports = db;

    const app = require('./server');

    app.listen(process.env.PORT,()=>{
        console.log('Listening on port 3000');
    })
})


