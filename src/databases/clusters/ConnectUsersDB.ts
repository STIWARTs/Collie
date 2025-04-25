import mongoose from 'mongoose';
import { IError } from 'types/Error.Constructor';

const MONGODB_URI =
  process.env.MONGODB_URI ||
  process.env.NEXT_PUBLIC_EMOTION_CLOUD_CLUSTER_MONGO_USERDB_URI;

// Cache the database connection
let cachedConnection: typeof mongoose | null = null;

const ConnectUsersDatabase = async () => {
  try {
    if (!MONGODB_URI) {
      throw new IError({
        name: 'Environment Error',
        message: 'MongoDB URI is not defined in environment variables',
      });
    }

    // If we have a cached connection, return it
    if (cachedConnection) {
      return cachedConnection;
    }

    const { connection } = await mongoose.connect(MONGODB_URI, {
      bufferCommands: true,
      maxPoolSize: 10,
      minPoolSize: 5,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      maxIdleTimeMS: 10000,
    });

    if (connection.readyState == 1) {
      console.log('Connected to MongoDB');
      cachedConnection = mongoose;
    }

    return connection;
  } catch (error) {
    if (error instanceof Error) {
      throw new IError({
        name: 'Database Connection Error',
        message: error.message,
      });
    }
  }
};

export default ConnectUsersDatabase;
