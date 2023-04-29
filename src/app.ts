import express from 'express';

import { connectAndInitDB } from './loaders';
import { PostRouter } from './entities/post';
import { UserRouter } from './entities/user';
import { AuthRouter } from './entities/auth';


const app = express();

connectAndInitDB();

app.use('/post', PostRouter);
app.use('/auth', AuthRouter);
app.use('/user', UserRouter);


export default app;