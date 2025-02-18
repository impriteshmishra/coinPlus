import {createClient} from "redis";

const redisClient = createClient();

redisClient.on('error', (err)=>{
    console.log("Redis error", err);
})

redisClient.connect()
.then(()=> console.log("Redis connected."))
.catch((err)=> console.log("Error while connecting redis", err))

export default redisClient;