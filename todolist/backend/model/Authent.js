const Users = require("../server");

exports.register = async (req, res, next) => {
    const {username, password} = req.body

    if (password.length < 6) {
        return res.status(400).json({ message: "Password less than 6 characs"})
    }

    try {
        await Users.create({
            username,
            password,
            email
        }).then(user => 
            res.status(200).json({
                message: "User successfully created",
                user,
            })
        )
    } catch (err) {
        res.status(401).json({
            message: "User not successfull created",
            error: error.message,
        })
    }
}