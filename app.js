const express = require('express');
const bp = require('body-parser');
const fs = require('fs');
const client = require('mongodb').MongoClient;

const app = express();
const router = express.Router();
let db;

app.use(bp.urlencoded({extended:false}));
app.use('/', router);
app.listen(3000, () => {
    console.log('3000번 포트로 서버 실행 중...');
    require('./module/db_conn.js')(client, router, db);
});
