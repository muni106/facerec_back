const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signing')
const profile = require('./controllers/profile')
const image = require('./controllers/image')


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '1QaZ2WsX3EdC4RfV/',
      database : 'facerec'
    }
  });


const app = express();
 
app.use(bodyParser.json());
app.use(cors())

//fake database
const database = {
    users:[
    {
        id:'123',
        name:'John',
        email:'john@gmail.com',
        password:'coockies',
        entries:0,
        joined: new Date()
    },
    {
        id:'124',
        name:'Sally',
        email:'sally@gmail.com',
        password:'bananas',
        entries:0,
        joined: new Date()
    }
    ],
    login:[
        {
            id:'987',
            has:'',
            email:'john@gmail.com'
        }
    ]
}


app.get('/', (req,res)=>{res.send(database.users)})


app.post('/signin', (req, res)=> {signin.handleSignin(req, res, db, bcrypt)})


app.post('/register',(req, res)=> {register.handleRegister(req, res, db, bcrypt)})


app.get('/profile/:id',(req, res)=> {profile.handleProfile(req, res, db)} )


app.put('/image', (req, res)=> {image.handleImage(req, res, db)} )


/* const Port = process.env.PORT */
app.listen(3000, ()=>{
    console.log(`app is running on port 3000 `);
})
