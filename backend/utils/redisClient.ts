// import {createClient} from "redis";

// const redisClient = createClient();

// redisClient.on('error', (err)=>{
//     console.log("Redis error", err);
// })

// redisClient.connect()
// .then(()=> console.log("Redis connected."))
// .catch((err)=> console.log("Error while connecting redis", err))

// export default redisClient;

import { createClient } from 'redis';

const redisClient = createClient({
    url: process.env.REDIS_URL
});

redisClient.on("error", (err) => console.log("Redis client error:", err));
redisClient.on("connect", () => console.log("Redis client connected"));

const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log("Redis successfully connected.");
    } catch (error) {
        console.log("Redis connection failed:", error);
    }
}

connectRedis();

export default redisClient;

