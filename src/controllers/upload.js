let path = require('path')
let jwt = require('jsonwebtoken')
let fs = require('fs')
const POST = (req, res) => {
    try {
        const { file } = req.files
        const fileName = file.name.replace(/\s/g, '')
        const filePath = path.join(process.cwd(), 'src', 'database', 'files', fileName)

        file.mv( filePath )
    
        const files = require('../database/files.json')
        let userid = jwt.verify( req.body.userId, '$$$$$')
        let newFile = {
            fileId: files.length ? files.length + 1 : 1,
            userId: userid.userId,
            fileLink: fileName,
            title: req.body.title,
            time: dat(),
            size: `${parseInt(file.size / (2 ** 20))}MB`
        }
        files.push(newFile)
        fs.writeFileSync( path.join(path.join(process.cwd(), 'src', 'database/files.json')), JSON.stringify(files, null, 4))
        res
            .status(201)
            .send({ message: "OK", data: newFile})
    } catch(error) {
        res
            .status(400)
            .send({ message: error.message })
    }
}

function dat() {
    const d = new Date()

    let y = '' + d.getFullYear()
    let m = '' + d.getMonth()+1
    let dat = '' + d.getDate()
    let h = '' + d.getHours()
    let min = '' + d.getMinutes()

    let date = `${y.padStart(4,'0')}-${m.padStart(2,'0')}-${dat.padStart(2, '0')} | ${h.padStart(2, '0')}:${min.padStart(2, '0')}`
    return date
}

module.exports = {
    POST
}