import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import fs from 'fs';
import connectToMongoDB from './config/mongoConnection';

// app init
const app = express();

// mongodb connection
connectToMongoDB;

// middlewares
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(compression());

// use routes
fs.readdirSync('./routes').map(route => {
	import(`./routes/${route}`).then(r => {
		app.use('/api', r.default);
	});
});

const port = process.env.PORT | 5000;
app.listen(port, () => {
	console.log(`App is up on port: ${port}`);
});
