//npm install express mysql2 nodemon cors dotenv ejs

//import some dependencies/ packages

//Express Framework for Handling HTTP request
const express = require('express');
//Create  instance of framework
const app = express();
//DBMS Mysql
const mysql = require('mysql2');
//Cross origin resource sharing
const cors = require('cors');
//Enviroment variable
const dotenv = require('dotenv');

app.use(express.json());
app.use(cors());
dotenv.config();

// connecting to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

//CHECK FOR CONNECTION
db.connect((err) => {
    //if no connect = No wedding 
    if(err) return console.log("Error connecting to MySQL");

    //IF YES COONECTION = YES WEDDING
    console.log("Connected to MySQL as id: ", db.threadId);
})


//GET METHOD CODE GOES HERE
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


//STOP GET METHOD CODE HERE
app.get('/data', (req,res) =>{
    //Retrieve the data on database

    db.query('SELECT * FROM patients', (err, results) =>{
        if(err){
            console.error(err);
            res.status(500).send('Error Retrieving data')
        } else{
            //Display the patient record to the browser
            res.render('data', {results:results})
        }
    })
})

// start the server
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);

    //send a message to the browser
    console.log('Send message to the browser...')
    app.get('/', (req,res) => {
        res.send('YEY!!! Wedding can proceed, the server started sucessful!!!');
    })
})