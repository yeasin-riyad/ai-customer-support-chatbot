
import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("Please define MONGODB_URL in your .env.local file");
}

const cache =
  globalThis.mongoose ??
  (globalThis.mongoose = {
    conn: null,
    promise: null,
  });

const connectDb = async () => {
  if (cache.conn?.readyState === 1) {
    return cache.conn;
  }

  if (!cache.promise) {
    cache.promise = mongoose
      .connect(MONGODB_URL, {
        bufferCommands: false,
      })
      .then((instance) => instance.connection)
      .catch((error: unknown) => {
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
