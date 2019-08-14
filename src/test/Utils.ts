import { FixtureStatus } from "./../components/Fixture/model";
import TeamModel from "../components/Team/model";
import FixtureModel from "../components/Fixture/model";
import UserModel from "../components/User/model";

class TestUtil {
  createTestTeam = () => {
    return new TeamModel({
      email: "test@email.com",
      name: "test team",
      stadium: "test stadium",
      points: 2,
      memberCount: 3,
      netWorth: 100
    });
  };

  createTestTeamSearch = () => {
    return new TeamModel({
      email: "test@email.com",
      name: "test team"
    });
  };

  createTestFixture() {
    return new FixtureModel({
      title: "Test fixture title 1",
      category: "English",
      venue: "test venue",
      time: new Date(),
      tags: "test tags"
    });
  }

  createTestSearchFixture() {
    return new FixtureModel({
      category: "English",
      tags: "test tags",
      status: FixtureStatus[0]
    });
  }

  createUser() {
    return new UserModel({
      email: "test@mail.com",
      password: "test123"
    });
  }
}

export default new TestUtil();
