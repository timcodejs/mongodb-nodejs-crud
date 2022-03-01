module.exports = (router, db) => {
    router.route('/member/login').post((req, res) => {
        const userinfo = {
            userid: req.body.userid,
            userpw: req.body.userpw
        }
        if(db) {
            loginMember(userinfo, (err, result) => {
                if(err) {
                    res.writeHead(200, {'content-type':'text/html'});
                    res.write('<h2>로그인 실패</h2>');
                    res.write('<p>오류가 발생했습니다.</p>');
                    res.end();
                } else {
                    if(result) {
                        res.writeHead(200, {'content-type':'text/html'});
                        res.write('<h2>로그인 성공</h2>');
                        const session = result[0];
                        res.write(`<p>아이디 : ${session.userid}</p>`);
                        res.write(`<p>비밀번호 : ${session.userpw}</p>`);
                        res.write(`<p>이름 : ${session.name}</p>`);
                        res.write(`<p>성별 : ${session.gender}</p>`);
                        res.end();
                    } else {
                        res.writeHead(200, {'content-type':'text/html'});
                        res.write('<h2>로그인 실패</h2>');
                        res.write('<p>아이디 또는 비밀번호를 확인하세요.</p>');
                        res.end();
                    }
                }
            });
        } else {
            res.writeHead(200, {'content-type':'text/html'});
            res.write('<h2>데이터베이스 연결 실패</h2>');
            res.write('<p>mongodb 데이터베이스 연결 실패</p>');
            res.end();
        }
    });

    const loginMember = (userinfo, callback) => {
        const members = db.collection('member');
        members.find({userid:userinfo.userid, userpw:userinfo.userpw}).toArray((err, result) => {
            if(err) {
                console.log(err);
                return callback(err, null);
            } else {    
                if(result.length > 0) {
                    console.log('일치하는 사용자가 있습니다.');
                    return callback(null, result);
                } else {
                    console.log('일치하는 사용자가 없습니다.');
                    return callback(null, null);
                }
            }
        })
    }
}