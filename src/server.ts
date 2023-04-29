 import app from './app';
 import * as Config from './config';


 const server = app.listen(Config.APP_PORT, ()=> {
    console.log(`App is running on ${Config.APP_PORT}`)
 })

 process.on('SIGTERM', () => {
    console.error('SIGTERM signal received: closing HTTP server')
    server.close(() => {
        console.log('HTTP server closed')
    })
  })