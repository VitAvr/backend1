import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import db from './config/database.js';
import userRoute from './routes/userRoute.js';
import feedbackRoute from './routes/feedbackRoute.js';
import firmRoute from './routes/firmRoute.js';
//-------------
import imageRoute from './routes/imageRoute.js';
//------------
const app = express();

try {
    await db.authenticate();
    console.log('Database connected...');
} catch (error) {
    console.error('Connection error:', error);
}
//----------
app.use(cors({ credentials: true, origin: 'https://frontend1k-34b498e2dffc.herokuapp.com/' }));
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, masters!');
});

app.post('/auth/login', (req, res) => {
    console.log(req.body);
    res.json({
        success: true,
    });
});
app.use('/users', userRoute);
app.use('/feedback', feedbackRoute);
app.use('/firms', firmRoute);
app.use('/image', imageRoute)

const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, (error) => {
   error
      ? console.log(error)
      : console.log(`Server OK. listening port ${PORT}`);
});
