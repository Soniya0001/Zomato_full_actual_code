//class29,30,31
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const dotenv = require("dotenv");
const passport = require("passport");
const cookieSession = require("cookie-session");
const app = express();


const Route = require("./Route/index");
// const corsOptions = {
//     origin : 'http://localhost:3000',
//     credentials: 'true',
//     optionSuccessStatus: 200
// };
const corsOptions = {
    origin: ['http://localhost:3000'],
    // origin: process.env.REACT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    optionSuccessStatus: 200,
    allowedHeaders: "X-Requested-With,content-type, x-token, Access-Control-Allow-Credentials"
}

app.use(cors(corsOptions));

const Port = process.env.PORT || 5500;
// const hostname = "localhost";
const hostname = "0.0.0.0";
const paymentRoute = require("./Controller/payment");
const  authRoute = require("./Controller/auth");
const passportSetup = require("./Controller/passport")


dotenv.config();

//Request mangement

app.use(cookieSession({ name: "session", keys:["zomato"], maxAge:24*60*60*1000 }))

app.use(express.json());  //a body parser required to post a data
app.use(passport.initialize());
app.use(passport.session()); //for logout in a period of time

app.use('/',Route);
app.use('/api/payment/',paymentRoute);
app.use('/auth',authRoute);

const mongoAtlas = "mongodb+srv://soniyasigroha001:hMJrPlfvBwwZrrn9@cluster0.knnmjxx.mongodb.net/SampleDB?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(mongoAtlas,{
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(res => {
    app.listen(Port, hostname,() =>{
        console.log(`Server is running at ${hostname}:${Port}`)
    });
})
.catch (err => console.log(err));
