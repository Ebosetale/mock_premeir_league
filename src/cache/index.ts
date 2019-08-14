import { Tedis } from "redis-typescript";

class RedisCache {
  private client: Tedis;
  private getAsync: any;
  private collection = "MOCK_PREMIER_CACHE";
  constructor() {
    this.client = new Tedis({
      port: 13389,
      host: process.env.REDIS_URI,
      password: process.env.REDIS_PASS
    });
  }

  async set(key: string, value: any) {
    await this.client.hset(this.collection, key, JSON.stringify(value));
  }

  async get(key: string): Promise<string> {
    const cached = await this.client.hget(this.collection, key);
    return cached;
  }

  async clearCache(): Promise<string[]> {
    const keys = await this.client.hkeys(this.collection);

    if (keys != null) {
      keys.forEach(key => {
        this.client.hdel(this.collection, key);
      });
    }
    return keys;
  }
}

export default new RedisCache();
