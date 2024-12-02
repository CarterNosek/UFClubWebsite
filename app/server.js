const express = require('express');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables

var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DATABASE
});
connection.connect();


const app = express();
const bodyParser = require('body-parser')
const port = 8080;

app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  connection.execute('SELECT `password` FROM `member_data` WHERE `username` = ?', [username], function (error, results, fields) {
    if (error) {
      return res.status(500).send({
        message: 'Error when retrieving data: ' + error.code
      });
    }

    // Check if no user found
    if (results.length === 0) {
      return res.status(404).send({
        message: "Username not found"
      });
    }

    if(password == results[0]['password']) {
        res.send({
           token: true
        });
    } else {
        res.send({
          token: false,
          message: "Invalid Password"
      });
    }
  });
  
});

// ---EVENTS---
app.post('/create_event', (req, res) => {
  const event = [
    req.body.event_name, 
    req.body.month, 
    req.body.day, 
    req.body.year, 
    req.body.location, 
    req.body.person_of_contact, 
    req.body.start_time, 
    req.body.end_time, 
    req.body.points_awarded || 0
  ];

  connection.execute('INSERT INTO events VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', event, function (error, results, fields) {
    if (error) {
      console.error('Error adding event:', error);
      return res.status(500).send('Error when adding event: ' + error.code);
    }
    res.status(201).send('Event added.');
  });
});

app.post('/delete_event', (req, res) => {
  const { event_name, month, day, year, start_time, end_time } = req.body;

  connection.execute(
    'DELETE FROM events WHERE event_name = ? AND month = ? AND day = ? AND year = ? AND start_time = ? AND end_time = ?', 
    [event_name, month, day, year, start_time, end_time], 
    function (error, results, fields) {
      if (error) {
        console.error('Error deleting event:', error);
        return res.status(500).send('Error when deleting event: ' + error.code);
      }
      
      // Check if any rows were actually deleted
      if (results.affectedRows > 0) {
        res.status(200).send('Event deleted.');
      } else {
        res.status(404).send('Event not found.');
      }
  });
});

app.put('/update_event', (req, res) => {
  const { event_name, month, day, year, location, person_of_contact, start_time, end_time, points_awarded} = req.body;

  connection.query(
    "UPDATE events SET `month` = ?, `day` = ?, `year` = ?, `location` = ?, `person_of_contact` = ?, `start_time` = ?, `end_time` = ?, `points_awarded` = ? Where event_name = ?",
  [month, day, year, location, person_of_contact, start_time, end_time, points_awarded, event_name],
  function (error, results) { 
    if (error) {
      console.error('Error updating event:', error);
      return res.status(500).send('Error when updating event: ' + error.code);
    }

    res.status(200).send('Event updated.');
  })
});

app.get('/access_events', (req, res) => {
  connection.query('SELECT * FROM EVENTS', function (error, results, fields) {
    if (error) res.send('error when retrieving data: ' + error.code);
    res.send(results);
  });
})

app.post('/register', (req, res) => {
  const member = [req.body.username, req.body.password, null, null, null, req.body.email];
  console.log(req.body.username + ':' + req.body.password)

  connection.execute('INSERT INTO member_data VALUES (?, ?, ?, ?, ?, ?)', member, function (error, results, fields) {
    if (error) {
       res.send({
        message: 'error when registering: ' + error.code,
        token: false
      })
       return;
    }
    res.send({
      message: 'Registered.',
      token: true
    });
  });
  
});

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Here is the home page')
})

app.get('/data/', (req, res) => {
  connection.query('SELECT * FROM Events', function (error, results, fields) {
    if (error) res.send('error when retrieving data: ' + error.code);
    res.send(results);
  });
})


app.get('/index/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
})

app.listen(port, () => console.log(`API is running on http://localhost:${port}`));