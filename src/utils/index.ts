import { FixtureStatus } from "./../components/Fixture/model";
import * as bcrypt from "bcrypt";

const Utils = {
  async generateUrl(
    title: string,
    category: string,
    time: string,
    status: string
  ): Promise<string> {
    try {
      if (FixtureStatus.indexOf(status) == -1) {
        throw new Error(`Invalid status provided - ${status}.`);
      }

      let search = `${title}${category}${time}${status}`
        .toLowerCase()
        .trim()
        .replace(/ /g, "");

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(search, salt);
      return hash;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async generateKey(keyWords: string): Promise<string> {
    let key = keyWords
      .toLowerCase()
      .trim()
      .replace(/ /g, "")
      .substr(4, 50);

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(key, salt);
    return key;
  }
};

export default Utils;
