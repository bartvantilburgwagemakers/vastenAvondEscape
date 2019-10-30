const jestConfig = {
    verbose: true,
    testURL: "http://localhost/",
    'transform': {
        '^.+\\.jsx?$': 'babel-jest',
    },
    testMatch: ['**/tests/*.test.js?(x)'],
}

module.exports = jestConfig