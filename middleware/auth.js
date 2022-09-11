const { User } = require("../models/User");

let auth = (req, res, next) => {
    // 인증처리
    // 쿠키에서 토큰 가져오고 복호화 한 뒤 판단
    let token = req.cookies.x_auth;

    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true })
        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = { auth };