module.exports = (client, router, db) => {
    const url = 'mongodb://127.0.0.1:27017';
    client.connect(url, {useUnifiedTopology:true}, (err, conn) => {
        if(err) {
            console.log(`데이터베이스 연결 실패 : ${err}`);
        } else {
            console.log('데이터베이스 연결 성공');
            db = conn.db('frontend');

            require('./regist.js')(router, db);
            require('./login.js')(router, db);
            require('./edit.js')(router, db);
            require('./delete.js')(router, db);
        }
    });
}