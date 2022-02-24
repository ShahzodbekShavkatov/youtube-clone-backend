const sha256 = require('sha256')
const jwt = require('jsonwebtoken')

const LOGIN = (req, res) => {
    try {
        const { username, password } = req.body
        const users = req.select('users')
        let shaPassword = sha256(password)
        let userFind;
        for (let user of users) {
            if(user.username == username && user.password == shaPassword) {
                userFind = user
            }
        }
        if(!userFind) {
            res.status(400).json({ message: "Wrong username or password!" })
        }
        res.status(200).json({
            message: "The user successfully logged in!",
            token: jwt.sign({ userId: userFind.userId }, '$$$$$'),
            id: userFind.userId
        })
        console.log(jwt.sign({ userId: userFind.userId }, '$$$$$'))
    } catch(error) {
        res.status(404).json({ message: error.message })
    }
}

const REGISTER = (req, res) => {
    try {
        const { username, password } = req.body
        const users = req.select('users')
        let newUser = {
            userId: users.length ? users[users.length - 1].userId +1 : 1,
            username,
            password: sha256(password)
        }
        users.push(newUser)
        req.insert('users', users)
        console.log(newUser)
        res.status(201).json({
            message: "The user successfully registered",
            token: jwt.sign({ userId: newUser.userId }, '$$$$$'),
            id: newUser.userId
        })
    } catch(error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports = {
    REGISTER,
    LOGIN
}
