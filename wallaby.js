module.exports = function (wallaby) {
  return {
    files: [     
      'App/**/*.ts',
     // {pattern: 'app/**/*.snap', load: false, instrument: false},
      {pattern: 'App/**/*.test.ts', ignore: true},
      {pattern: 'App**/*.test.tsx', ignore: true, load: false}
    ],

    tests: [
      'App/**/*.test.ts',
      'App/**/*.test.tsx'
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