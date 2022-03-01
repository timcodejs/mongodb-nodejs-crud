module.exports = (router, db) => {
    router.route('/member/delete').delete((req, res) => {
        const userid = req.body.userid;

        if(db) {
            deleteMember(userid, (err, result) => {
                if(err) {
                    res.writeHead(200, {'content-type':'text/html'});
                    res.write('<h2>회원 정보 삭제 실패</h2>');
                    res.write('<p>오류가 발생했습니다.</p>');
                    res.end();
                } else {
                    if(result.deletedCount > 0) {
                        res.writeHead(200, {'content-type':'text/html'});
                        res.write('<h2>회원 정보 삭제 성공</h2>');
                        res.write('<p>회원 탈퇴를 성공했습니다.</p>');
                        res.end();
                    } else {
                        res.writeHead(200, {'content-type':'text/html'});
                        res.write('<h2>회원 정보 삭제 실패</h2>');
                        res.write('<p>존재하지 않는 아이디입니다.</p>');
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

    const deleteMember = (userid, callback) => {
        const members = db.collection('member');
        members.deleteOne({userid:userid}, (err, result) => {
            if(err) {
                console.log(err);
                return callback(err, null);
            } else {
                if(result.deletedCount > 0) {
                    console.log(`사용자 document ${result.deletedCount}명이 삭제되었습니다.`);
                } else {
                    console.log('삭제된 document가 없습니다.');
                }
                return callback(null, result);
            }
        });
    }
}