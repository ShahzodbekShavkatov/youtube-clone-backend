const express = require("express")
const fileUpload = require('express-fileupload')
const path = require('path')
const PORT = process.env.PORT || 1515
const app = express()
const jwt = require('jsonwebtoken')
const fs = require('fs')
const cors = require('cors')
app.use(cors())

const modelMiddleware = require('./middlewares/model.js')

app.use('/getFile', express.static(path.join(__dirname, 'database', 'files')))
app.use(express.json())
app.use(modelMiddleware)
app.use(fileUpload())

const userRouter = require('./routes/user.js')
const authRouter = require('./routes/auth.js')
const videoRouter = require('./routes/video.js')
const uploadRouter = require('./routes/upload.js')

app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/video', videoRouter)
app.use('/upload', uploadRouter)
// app.get('/video', (req, res) => {
//     res.send(
//         require('./database/files.json')
//     )
// })
app.get('/download/:fileName', (req, res) => {
    try {
        res.download( path.join(__dirname, 'database', 'files', req.params.fileName) )
        console.log( path.join(__dirname, 'database', 'files', req.params.fileName))
    } catch(error) {
        res
            .status(400)
            .send({ message: error.message })
    }
})
// app.post('/upload', (req, res) => {
//     try {
//         const { file } = req.files
//         const fileName = file.name.replace(/\s/g, '')
//         const filePath = path.join(__dirname, 'database', 'files', fileName)

//         file.mv( filePath )
//         let t = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTY0MTQ0OTMyMn0.QykpNXoDRYOyxKOh5wDolKCv9Br_-XNQ2j9WzeixZoQ'
//         console.log(jwt.verify(t, '$$$$$'))
    
//         const files = require('./database/files.json')
//         let userid = jwt.verify( req.body.userId, '$$$$$')
//         console.log(userid)
//         let newFile = {
//             fileId: files.length ? files.length + 1 : 1,
//             userId: userid.userId,
//             fileLink: fileName,
//             title: req.body.title,
//             time: dat(),
//             size: `${parseInt(file.size / (2 ** 20))}MB`
//         }
//         files.push(newFile)
//         fs.writeFileSync( path.join(__dirname, '/database/files.json'), JSON.stringify(files, null, 4))
//         res
//             .status(201)
//             .send({ message: "OK", data: newFile})
//     } catch(error) {
//         res
//             .status(400)
//             .send({ message: error.message })
//     }
// })
// function dat() {
//     const d = new Date()

//     let y = '' + d.getFullYear()
//     let m = '' + d.getMonth()+1
//     let dat = '' + d.getDate()
//     let h = '' + d.getHours()
//     let min = '' + d.getMinutes()

//     let date = `${y.padStart(4,'0')}-${m.padStart(2,'0')}-${dat.padStart(2, '0')} | ${h.padStart(2, '0')}:${min.padStart(2, '0')}`
//     return date
// }


app.listen(PORT, () => console.log('Backend server is running on http://localhost:' + PORT))