require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const os = require('os');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const cleaning = require('./helper/cleanDB');
const authRoutes = require('./routes/auth');
const questionRoute = require('./routes/questions');
const historyRoute = require('./routes/history');
const testingRoute = require('./routes/testing');
const configsRoute = require('./routes/configs');
const uploadRoute = require('./routes/upload');
const usersRoute = require('./routes/users');
const errorMiddleware = require('./middlewares/error-middlewares');
const app = express();
const config = process.env;
const PORT = config.PORT ?? 3000;
const host = config.HOST_URL;

app.listen(PORT, async () => {
    try {
        await mongoose.connect(config.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log(`${host}${PORT}`);
        await clean();
    } catch (e) {
        console.log(e + '++++++');
    }
});


app.use(cors());
// app.use(cors({origin: process.env.requestURL, credentials: true}));
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Credentials', 'true');
//     next();
// });
app.use(fileUpload({}));
app.use(express.json());
app.use(cookieParser({secure: false}));
app.use(express.urlencoded({extended: true}));
app.use('/auth', authRoutes);
app.use('/question', questionRoute);
app.use('/testing', testingRoute);
app.use('/history', historyRoute);
app.use('/configs', configsRoute);
app.use('/upload', uploadRoute);
app.use('/users', usersRoute);
app.use(errorMiddleware);


async function clean() {
    await cleaning.history();
}

