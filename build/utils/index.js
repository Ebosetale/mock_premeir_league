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
const model_1 = require("./../components/Fixture/model");
const bcrypt = require("bcrypt");
const Utils = {
    generateUrl(title, category, time, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (model_1.FixtureStatus.indexOf(status) == -1) {
                    throw new Error(`Invalid status provided - ${status}.`);
                }
                let search = `${title}${category}${time}${status}`
                    .toLowerCase()
                    .trim()
                    .replace(/ /g, "");
                const salt = yield bcrypt.genSalt(10);
                const hash = yield bcrypt.hash(search, salt);
                return hash;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    generateKey(keyWords) {
        return __awaiter(this, void 0, void 0, function* () {
            let key = keyWords
                .toLowerCase()
                .trim()
                .replace(/ /g, "")
                .substr(4, 50);
            const salt = yield bcrypt.genSalt(10);
            const hash = yield bcrypt.hash(key, salt);
            return key;
        });
    }
};
exports.default = Utils;
//# sourceMappingURL=index.js.map