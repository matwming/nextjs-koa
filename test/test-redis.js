const Redis=require('ioredis');

const redis=new Redis({
    port:6379
});

const keys=async()=>{
    await redis.keys("*");
    console.log('keys',keys)
    await redis.set('c','123');
    const result=await redis.keys('*')
    console.log('keys-after-set',result)
}
keys()

