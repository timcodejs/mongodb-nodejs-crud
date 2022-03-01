module.exports = (router, db) => {
    router.route('/member/edit').put((req, res) => {
        const userinfo = {
            userid: req.body.userid,
            userpw: req.body.userpw,
            name: req.body.name,
            gender: req.body.gender
        }
        if(db) {
            editMember(userinfo, (err, result) => {
                if(err) {
                    res.writeHead(200, {'content-type':'text/html'});
                    res.write('<h2>회원 정보 수정 실패</h2>');
                    res.write('<p>오류가 발생했습니다.</p>');
                    res.end();
                } else {
                    if(result.modifiedCount > 0) {
                        res.writeHead(200, {'content-type':'text/html'});
                        res.write('<h2>회원 정보 수정 성공</h2>');
                        res.write('<p>정보 수정을 성공했습니다.</p>');
                        res.end();
                    } else {
                        res.writeHead(200, {'content-type':'text/html'});
                        res.write('<h2>회원 정보 수정 실패</h2>');
                        res.write('<p>수정사항이 없습니다.</p>');
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

    const editMember = (userinfo, callback) => {
        const members = db.collection('member');
        members.updateOne(
            {userid:userinfo.userid},
            {$set:{
                userid:userinfo.userid, 
                userpw:userinfo.userpw, 
                name:userinfo.name, 
                gender:userinfo.gender
            }}, (err, result) => {
                if(err) {
                    console.log(err);
                    return callback(err, null);
                } else {
                    if(result.modifiedCount > 0) {
                        console.log(`사용자 document ${result.modifiedCount}명이 수정되었습니다.`);
                    } else {
                        console.log('수정된 document가 없습니다.');
                    }
                    return callback(null, result);
                }
        })
    }
}