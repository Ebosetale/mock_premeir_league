import TestUtil from "./Utils";
import TeamService from "../components/Team/service";

describe("TeamService testing", () => {
  afterEach(() => {});

  describe("Team can be deleted by Id", () => {
    it("should delete a team and returns the id", async () => {
      const res = await TeamService.addTeam(
        TestUtil.createTestTeam().toObject()
      );
      const del = await TeamService.deleteTeam(`${res._id}`);
      expect(del).toHaveProperty("_id");
    });
  });

  describe("Team can be updated", () => {
    it("should modify an existing team", async () => {
      const res = await TeamService.addTeam(
        TestUtil.createTestTeam().toObject()
      );
      res.points = 400;
      const updated = await TeamService.modifyTeam(res.toObject(), res._id);
      expect(updated).toHaveProperty("_id");
      expect(updated.points).toEqual(400);
      const del = await TeamService.deleteTeam(`${res._id}`);
    });
  });

  describe("Team can be searched by name and email", () => {
    it("should return a team that has the email and name", async () => {
      const res = await TeamService.addTeam(
        TestUtil.createTestTeam().toObject()
      );
      const searchTerm = TestUtil.createTestTeamSearch();
      const searched = await TeamService.searchTeam(searchTerm.toObject());
      expect(searched.name).toContain(searchTerm.name);
      expect(searched.email).toContain(searchTerm.email);
      const del = await TeamService.deleteTeam(`${res._id}`);
    });
  });

  describe("When adding a team", () => {
    describe("if team name and other information is not registered already", () => {
      it("should register the team and return the registered team with an Id", async () => {
        const res = await TeamService.addTeam(
          TestUtil.createTestTeam().toObject()
        );
        expect(res).toHaveProperty("_id");
        const del = await TeamService.deleteTeam(`${res._id}`);
      });
    });
  });
});
