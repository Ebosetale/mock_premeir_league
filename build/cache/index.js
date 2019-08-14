"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_typescript_1 = require("redis-typescript");
class RedisCache {
    constructor() {
        this.collection = "MOCK_PREMIER_CACHE";
        this.client = new redis_typescript_1.Tedis({
            port: 13389,
            host: process.env.REDIS_URI,
            password: process.env.REDIS_PASS
        });
    }
    set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.hset(this.collection, key, JSON.stringify(value));
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const cached = yield this.client.hget(this.collection, key);
            return cached;
        });
    }
    clearCache() {
        return __awaiter(this, void 0, void 0, function* () {
            const keys = yield this.client.hkeys(this.collection);
            if (keys != null) {
                keys.forEach(key => {
                    this.client.hdel(this.collection, key);
                });
            }
            return keys;
        });
    }
}
exports.default = new RedisCache();
//# sourceMappingURL=index.js.map