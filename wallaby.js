module.exports = function (wallaby) {
  return {
    files: [
      'app/server/**/*.ts*',
      'app/server/**/*Test*',
      {pattern: 'app/server/**/*.test.ts', ignore: true}
    ],

    tests: [
      'app/server/**/*.test.ts'
    ],

    compilers: {
      '**/*.ts': wallaby.compilers.typeScript({ module: 'commonjs' })
    },
    testFramework: "jest",
    env: {
      type: 'node',
      runner: "node"
    },
    debug: true
  };
};