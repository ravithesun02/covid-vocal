import config from './../config/config'
import app from './express'
import mongoose from 'mongoose'
import fs from 'fs'
import https from 'https'
import http from 'http'



// Connection URL
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true,useFindAndModify:false })
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`)
})
// app.listen(config.port, (err) => {
//   if (err) {
//     console.log(err)
//   }
//   console.info('Server started on port %s.', config.port)
// })

const privateKey = fs.readFileSync('/etc/letsencrypt/live/www.covid.pucho.ai/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/www.covid.pucho.ai/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/www.covid.pucho.ai/fullchain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};


// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});