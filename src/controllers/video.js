const GET = (req, res) => {
    res.send(
        require('../database/files.json')
    )
}


module.exports = {
    GET
}