import Authservice from "../components/Auth/service";
import UserService from "../components/User/service";
import TestUtils from "./Utils";

describe("UserService Test", () => {
  describe("Can add user with a unique email address and password", () => {
    it("should create a new user and return it", async () => {
      const user = await Authservice.createUser(
        TestUtils.createUser().toObject()
      );
      expect(user).not.toBeNull();
      expect(user).toHaveProperty("_id");

      await UserService.remove(`${user._id}`);
    });
  });

  describe("can get a registerd user", () => {
    it("should return a registered user", async () => {
      const user = await Authservice.createUser(
        TestUtils.createUser().toObject()
      );
      const fetchedUser = await Authservice.getUser(
        TestUtils.createUser().toObject()
      );
      expect(fetchedUser).not.toBeNull();
      expect(fetchedUser).toHaveProperty("_id");

      await UserService.remove(`${fetchedUser._id}`);
    });
  });

  describe("can delete a registerd user", () => {
    it("should return the deleted user", async () => {
      const createdUser = await Authservice.createUser(
        TestUtils.createUser().toObject()
      );
      const deletedUser = await UserService.remove(`${createdUser._id}`);
      expect(deletedUser).not.toBeNull();
      expect(deletedUser).toHaveProperty("_id");
    });
  });

  describe("can upgrade a registerd user to admin", () => {
    it("should elevate a registered user to admin and return the updated admin", async () => {
      const createdUser = await Authservice.createUser(
        TestUtils.createUser().toObject()
      );

      const updtedUser = await UserService.setAdmin(createdUser.toObject());
      expect(updtedUser).not.toBeNull();
      expect(updtedUser.roles).toContain("admin");
      await UserService.remove(`${updtedUser._id}`);
    });
  });
});
