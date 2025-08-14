const WINDOW_SIZE = 60 * 1000;
const MAX_REQUESTS = 5;

let ipRequestMap = {}//in memory store

function rateLimiter(req,res,next){
  const IP = process.env.TEST_IP || req.ip;
  const now = Date.now();


if(!ipRequestMap[IP]){
  ipRequestMap[IP] = {count:1,startTime: now}
    return next();
}

const userData  = ipRequestMap[IP];
const diff = now - userData.startTime;



if(diff > WINDOW_SIZE){
  ipRequestMap[IP] = {count:1,startTime:now}
  return next();
}

userData.count++;

if(userData.count > MAX_REQUESTS) {
  return res.status(429).json({error:"Too many requests"})
}


next();
}

export default rateLimiter;

