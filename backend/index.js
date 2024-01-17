const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(
  cors({
    origin: "https://digitalclass.vercel.app",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let db;

function createConnection() {
  return mysql.createConnection({
    host:'digitalclass.cj6oiyg6qtjm.ap-southeast-2.rds.amazonaws.com', 
    user:'admin',
    password:'Cauvery$23',
    database: 'digital_class',
  });
}

function handleDisconnect() {
  db = createConnection();

  db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      setTimeout(handleDisconnect, 2000); // Retry every 2 seconds
    } else {
      console.log('Connected to the database');
    }
  });

  db.on('error', (err) => {
    console.error('Database error:', err);
    console.log('Reconnecting to the database...');
    handleDisconnect(); // Retry immediately
  });
}

// Initial database connection
handleDisconnect();

const institute = require('./Routes/Institute');
const logincheck = require('./Routes/login');
const userdata = require('./Routes/Userdata');
const addstudent = require('./Routes/AddStudent');
const deletestudent = require("./Routes/DeleteStudent");
const totalstudent = require("./Routes/TotalStudent");
const totalteacher = require("./Routes/TotalTeacher");
const addteacher = require('./Routes/Addteacher');
const deleteteacher = require('./Routes/DeleteTeacher');
const deleteclass = require('./Routes/DeleteClass');
const Studentdetail = require('./Routes/StudentDetail');
const teacherdetail = require('./Routes/TeacherDetail');
const addclass = require('./Routes/Addclass');
const classdetails = require('./Routes/Classdetails');
const updateStudent = require('./Routes/UpdateStudent');
const updateteacher = require('./Routes/updateteacher');
const updateclass = require('./Routes/UpdateClass');
const onestudentdetails = require('./Routes/UpdateStudentdetails');
const oneteacherdetails = require('./Routes/updateteacherdetail');
const oneclassdetails = require('./Routes/UpdateclassDetails');
const attendance = require('./Routes/AttendanceStudent');
const addattendance = require('./Routes/Attendance');
const log = require('./Routes/Logout');

// Use routes
app.use('/', institute(db));
app.use('/', logincheck(db));
app.use('/', userdata(db));
app.use('/', addstudent(db));
app.use('/', deletestudent(db));
app.use('/', totalstudent(db));
app.use('/', totalteacher(db));
app.use('/', addteacher(db));
app.use('/', deleteteacher(db));
app.use('/', deleteclass(db));
app.use('/', Studentdetail(db));
app.use('/', teacherdetail(db));
app.use('/', addclass(db));
app.use('/', classdetails(db));
app.use('/', updateStudent(db));
app.use('/', updateteacher(db));
app.use('/', updateclass(db));
app.use('/', onestudentdetails(db));
app.use('/', oneteacherdetails(db));
app.use('/', oneclassdetails(db));
app.use('/', attendance(db));
app.use('/', addattendance(db));
app.use('/', log());

app.listen(3003, () => {
  console.log('Server is running  3003');
});
