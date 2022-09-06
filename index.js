const express = require('express')
const app = express()
const port = 3000
const bodyparser = require('body-parser')
const { User } = require("./models/User")

const config = require('./config/key')

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connted...'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요~~~노드몬화이팅')
})


app.post('/register', (req, res) => {
   // 회원가입할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터 베이스에 넣어준다.

   console.log(req.body)

   const user = new User(req.body)

   user.save((err, doc) => {
    if (err) return res.json({ success: false, err})
    return res.status(200).json({
      success: true
    })
   })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})