import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

class MongoConnection {
	constructor() {
		this.connect();
	}

	async connect() {
		try {
			const conn = await mongoose.connect(process.env.MONGO_URL, {
				useUnifiedTopology: true,
				useNewUrlParser: true,
			});

			console.log(`MongoDB connected: ${conn.connection.host}`);
		} catch (error) {
			console.log(`ERROR: ${error.message}`);

			process.exit(1);
		}
	}
}

const connectToMongoDB = new MongoConnection();

export default connectToMongoDB;
