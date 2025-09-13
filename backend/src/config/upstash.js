import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { configDotenv } from "dotenv";

configDotenv();
//create a limiter that allows 100 request every 60 seconds
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "20 s"),
});

export default ratelimit;