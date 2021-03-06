import express from "express";
import routerUser from './routes/userRoutes';
import routerTweet from './routes/tweetRoutes';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import sessions from 'express-session';

const app = express();

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tweetdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const oneDay = 1000 * 60 * 60 * 24;

app.use(cookieParser());

//session middleware
app.use(sessions({
    secret: "secretKeyyhe663gd87fg32k",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/tweets', routerTweet)
app.use('/users', routerUser)

app.get('/', (req, res) => {
    res.sendStatus(200)
});

module.exports = app;