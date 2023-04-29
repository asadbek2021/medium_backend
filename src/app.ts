import express from 'express';
import cors from 'cors';

import { connectAndInitDB } from './loaders';
import { PostRouter } from './entities/post';
import { UserRouter } from './entities/user';
import { AuthRouter } from './entities/auth';
import { logger } from './utils';


const app = express();

connectAndInitDB(logger);

app.use(cors({
    origin: '*', 
}))
app.use('/post', PostRouter);
app.use('/auth', AuthRouter);
app.use('/user', UserRouter);


export default app;