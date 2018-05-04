module.exports = function (wallaby) {
	return {
		files: [
			'Src/Application/**/*.ts',
			'Src/Application/**/*.tsx',
			//'App/**/*.tf.*', //@wirejunky why testing *.md and the 1 .jpg file?
			'!Src/Application/**/*.test.ts', //in my personal implementations, I also opted for .test. extention... better BDD
			'!Src/Application/**/*.test.tsx',
			'!Src/Application/Server/Api/RouteTemplate.ts'
		],
		tests: [
			'Src/Application/**/*.test.ts',
			'Src/Application/**/*.test.tsx'
		],
		compilers: {
			'**/*.ts*': wallaby.compilers.typeScript({
				module: 'commonjs',
				jsx: 'react'
			})
		},
		testFramework: "jest",
		env: {
			type: 'node',
			runner: "node"
		},
		debug: true,
		setup: function (wallaby) {
			var jestConfig = require("./package.json").jest;
			wallaby.testFramework.configure(jestConfig);
		}
	};

};