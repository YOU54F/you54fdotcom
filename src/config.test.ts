import jest from "jest";
import { gitBranch } from "config";

describe("config", () => {
  it("should return the git branch", () => {
    const expectedResult = process.env.CI
      ? process.env.REACT_APP_GIT_BRANCH_CI
      : process.env.REACT_APP_GIT_BRANCH_LOCAL;
    expect(gitBranch).toEqual(expectedResult);
  });
});
