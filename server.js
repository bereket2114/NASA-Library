const express = require('express')
const app = express()
const PORT = 8000
const path = require('path')

// use Middleware for accessing my css and js file that are link to the html file!!
app.use(express.static(path.join(__dirname)))  // This alone dirname access all the file in that directory and used it !! or we use dirname with a specific folder and file as well !!
app.get('/', (req,res)=> {
    res.sendFile(path.join(__dirname, 'index.html'))
})
app.listen(PORT, ()=>{
    console.log(`This web is running on port ${PORT}.`)
})
