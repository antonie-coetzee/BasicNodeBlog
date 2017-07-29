module.exports = function (wallaby) {
  return {
    files: [
      'app/server/**/*.ts*',
      'app/client/**/*.ts*',
      'app/server/**/*Test*',
      {pattern: 'app/server/**/*.test.ts', ignore: true},
      {pattern: 'app/client/**/*.test.tsx', ignore: true}
    ],

    tests: [
      'app/server/**/*.test.ts',
      'app/client/**/*.test.tsx'
    ],

    compilers: {
      '**/*.ts*': wallaby.compilers.typeScript({ module: 'commonjs', jsx: 'react' })
    },
    testFramework: "jest",
    env: {
      type: 'node',
      runner: "node"
    },
    debug: true
  };
};