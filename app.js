const express = require('express');
const app = express();
const tasks = require('./routes/task');
const connectDB = require('./db/connect');
require('dotenv').config();
const notfound = require('./midddleware/notfound');
const errorHandlerMiddleware = require('./midddleware/error-handler');


//port no
const port = process.env.PORT || 5000;

/// static
app.use(express.static('./public'));

// parse form data middleware
app.use(express.urlencoded({extended : false}));
// parse json  middleware
app.use(express.json())


app.use('/api/v1/tasks',tasks);

app.use(notfound);
app.use(errorHandlerMiddleware);


const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port,(req, res)=>{
            console.log(`server listen the port no ${port}`);
        })
        
    } catch (error) {
        console.log(error);
    }
}

start();