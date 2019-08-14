module.exports = {
  roots: ["<rootDir>/src"],
  preset: "@shelf/jest-mongodb",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  setupFilesAfterEnv: [  // NOT setupFiles
    "./src/test/jestDefaultTimeout.js"
  ],
};
