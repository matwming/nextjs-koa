function getRedisSessionId(sid) {
  return `ssid:${sid}`;
}

class RedisSessionStore {
  constructor(client) {
    this.client = client;
  }
  //获取redis中存储的数据
  async get(sessionId) {
    console.log("get session,", sessionId);
    const id = getRedisSessionId(sessionId);
    const data = await this.client.get(id);
    if (!data) {
      return null;
    }
    try {
      const result = JSON.parse(data);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  //存储数据
  async set(sessionId, session, ttl) {
    console.log("set session", sessionId);
    const id = getRedisSessionId(sessionId);
    if (typeof ttl === "number") {
      ttl = Math.ceil(ttl / 1000);
    }
    try {
      const sessStr = JSON.stringify(session);
      if (ttl) {
        await this.client.setex(id, ttl, sessStr);
      } else {
        await this.client.set(id, sessStr);
      }
    } catch (error) {
      console.log(error);
    }
  }
  //delete a specified session
  async destroy(sessionId) {
    console.log("destroy session", sessionId);
    const id = getRedisSessionId(sessionId);
    await this.client.del(id);
  }
}
module.exports = RedisSessionStore;
