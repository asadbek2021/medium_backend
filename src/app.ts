import express from 'express';
import cors from 'cors';

import { connectAndInitDB } from './loaders';
import { PostRouter } from './entities/post';
import { UserRouter } from './entities/user';
import { AuthRouter } from './entities/auth';
import { logger } from './utils';
import { logMiddleware, authMiddleware, errorMiddleware } from './middlewares';

const app = express();

connectAndInitDB(logger);

app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json());

app.use(logMiddleware);

app.use('/auth', AuthRouter);

app.use(authMiddleware);

app.use('/post', PostRouter);
app.use('/user', UserRouter);

app.use(errorMiddleware);

export default app;
