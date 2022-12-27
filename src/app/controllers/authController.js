const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class authController {
    async userLogin (req, res) {
        try {
            
            const user = await User.findOne({username: req.body.username})
            if (!user) {
                return res.send('<script>alert("Sai tên đăng nhập hoặc mật khẩu"); window.location.href = "/"; </script>');
            }
            if (user.type != 'admin') {
                return res.send('<script>alert("Sai tên đăng nhập hoặc mật khẩu"); window.location.href = "/"; </script>');
                
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if (user && validPassword) {
                const accessToken = jwt.sign(
                    {
                        id: user.id,
                    },
                    "secretkey"
                )
                res.cookie("accessToken", accessToken, {
                    httpOnly: false,
                    secure: false,
                    sameSite: "strict"
                })
                res.redirect('/admin/user')
            } else {
                res.send('<script>alert("Sai tên đăng nhập hoặc mật khẩu"); window.location.href = "/"; </script>');
            }
        } catch (err) {
            res.status(500).send(err.message)
        }
    }

    userLogout(req, res) {
        res.clearCookie('accessToken').redirect('/')
    }
}

module.exports = new authController()