import { FixtureStatus } from "./../components/Fixture/model";
import TestUtil from "./Utils";
import FixtureService from "../components/Fixture/service";

describe("Fixture servide test", () => {
  describe("Can add a fixture to the db", () => {
    it("should add a fixture to the database, generate a link called URL and return the fixture", async () => {
      const addedFixture = await FixtureService.createFixture(
        TestUtil.createTestFixture().toObject()
      );
      expect(addedFixture).toHaveProperty("_id");
      expect(addedFixture.url).not.toBeNull();
      await FixtureService.removeFixture(`${addedFixture._id}`);
    });
  });

  describe("Can get a fixture by id", () => {
    it("should get a fixture using it's id", async () => {
      const addedFixture = await FixtureService.createFixture(
        TestUtil.createTestFixture().toObject()
      );
      expect(addedFixture).toHaveProperty("_id");
      expect(addedFixture.url).not.toBeNull();
      await FixtureService.removeFixture(`${addedFixture._id}`);
    });
  });
  describe("fixture to be deleted from the db", () => {
    it("should remove a fixture from the database and returned the deleted fixture", async () => {
      const addedFixture = await FixtureService.createFixture(
        TestUtil.createTestFixture().toObject()
      );
      const deleted = await FixtureService.removeFixture(`${addedFixture._id}`);
      expect(deleted).toHaveProperty("_id");
    });
  });

  describe("fixture can be searched", () => {
    it("should search for fixture from the database using key words and returned the fixture", async () => {
      const addedFixture = await FixtureService.createFixture(
        TestUtil.createTestFixture().toObject()
      );
      const searchTerm = TestUtil.createTestSearchFixture();
      delete searchTerm._id;
      const searched = await FixtureService.searchFixture(
        searchTerm.toObject()
      );
      expect(searched).toHaveProperty("_id");
      expect(searched.tags).toContain(searchTerm.tags);
      expect(searched.status).toContain(searchTerm.status);
      const deleted = await FixtureService.removeFixture(`${addedFixture._id}`);
    });
  });

  describe("fixture to be modified in the db", () => {
    it("should modify a fixture from the database and returned the deleted fixture", async () => {
      const addedFixture = await FixtureService.createFixture(
        TestUtil.createTestFixture().toObject()
      );
      addedFixture.status = FixtureStatus[1];
      const modified = await FixtureService.modifyFixture(
        addedFixture.toObject()
      );
      expect(modified).toHaveProperty("_id");
      expect(modified.status).toEqual(FixtureStatus[1]);
      const deleted = await FixtureService.removeFixture(`${addedFixture._id}`);
    });
  });
});
