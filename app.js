const express = require('express');
const mongoose = require('mongoose');
const res = require('express/lib/response');
const path = require('path');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const questionRoutes = require('./routes/questionRoutes');
const answerRoutes = require('./routes/answerRoutes');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

//database connection
const dbURI = 'mongodb+srv://rahulbad219:KIkEf8qe7YeSIsS3@sgflowcluster.ubvv82p.mongodb.net/SGDb';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json());
app.use(cookieParser());

app.set('views', './public/src/views/');
app.set('view engine', 'ejs');

//routes
//app.get('*', checkUser); //will check if user is logged in for every route
app.get('/', (req, res) => {
    res.render('index');
});
app.use(authRoutes);
app.use('/question', questionRoutes);
app.use('/answer', answerRoutes);

app.listen(3001, () => 
{
    console.log('Hello Peter :)');
});