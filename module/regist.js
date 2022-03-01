module.exports = (router, db) => {
    router.route('/member/regist').post((req, res) => {
        const userinfo = {
            userid: req.body.userid,
            userpw: req.body.userpw,
            name: req.body.name,
            gender: req.body.gender
        }

        if(db) {
            joinMember(userinfo, (err, result) => {
                if(err) {
                    res.writeHead(200, {'content-type':'text/html'});
                    res.write('<h2>회원가입 실패</h2>');
                    res.write('<p>오류가 발생했습니다.</p>');
                    res.end();
                } else {
                    if(result.insertedCount > 0) {
                        res.writeHead(200, {'content-type':'text/html'});
                        res.write('<h2>회원가입 성공</h2>');
                        res.write('<p>가입이 성공적으로 완료되었습니다.</p>');
                        res.end();
                    } else {
                        res.writeHead(200, {'content-type':'text/html'});
                        res.write('<h2>회원가입 실패</h2>');
                        res.write('<p>오류가 발생했습니다.</p>');
                        res.end();
                    }
                }
            })
        } else {
            res.writeHead(200, {'content-type':'text/html'});
            res.write('<h2>데이터베이스 연결 실패</h2>');
            res.write('<p>mongodb 데이터베이스 연결 실패</p>');
            res.end();
        }
    });

    const joinMember = (userinfo, callback) => {
        const members = db.collection('member');
        members.insertMany([
            {
                userid:userinfo.userid, 
                userpw:userinfo.userpw, 
                name:userinfo.name, 
                gender:userinfo.gender
            }
        ], (err, result) => {
            if(err) {
                console.log(err);
                return callback(err, null);
            } else {
                if(result.insertedCount > 0) {
                    console.log(`사용자 document ${result.insertedCount}명이 추가되었습니다.`);
                } else {
                    console.log('사용자 document가 추가되지 않았습니다.');
                }
                return callback(null, result);
            }
        });
    }
}