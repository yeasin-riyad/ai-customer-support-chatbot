
import mongoose from "mongoose";
import type { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error(
    "Please define the MONGODB_URL environment variable in your .env.local file",
  );
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}



const cache: MongooseCache =
  globalThis.mongoose ??
  (globalThis.mongoose = {
    conn: null,
    promise: null,
  });

const connectDb = async (): Promise<Mongoose> => {
  // Return the existing connection if already connected.
  if (cache.conn?.connection.readyState === 1) {
    return cache.conn;
  }

  // Reuse an ongoing connection attempt.
  if (!cache.promise) {
    cache.promise = mongoose
      .connect(MONGODB_URL, {
        bufferCommands: false,
      })
      .then((instance) => {
        console.log("MongoDB connected successfully");
        return instance;
      })
      .catch((error: unknown) => {
        // Allow subsequent calls to retry the connection.
        cache.promise = null;
        throw error;
      });
  }

  try {
    cache.conn = await cache.promise;
    return cache.conn;
  } catch (error) {
    cache.promise = null;

    console.error("MongoDB connection failed:", error);
    throw error;
  }
};

export default connectDb;
