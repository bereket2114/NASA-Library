const express = require('express')
const app = express()
const PORT = 8000
const path = require('path')

// use Middleware for accessing my css and js file that are link to the html file!!
app.use(express.static(path.join(__dirname)))
app.get('/', (req,res)=> {
    res.sendFile(path.join(__dirname, 'NASA-file.html'))
})
app.listen(PORT, ()=>{
    console.log(`This web is running on port ${PORT}.`)
})
