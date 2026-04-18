const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

const authRouter = require('./routes/auth.routes');
const interviewRouter = require('./routes/interview.routes');
const studyRouter = require('./routes/study.routes');
const taskRouter = require('./routes/task.routes');

app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);
app.use('/api/study', studyRouter);
app.use('/api/tasks', taskRouter);

module.exports = app;