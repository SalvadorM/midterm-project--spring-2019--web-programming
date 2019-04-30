const {src} = require(`gulp`)
const jsLinter = require(`gulp-eslint`)

const linterJS = () => {
    return src([
        `./app/dev/scripts/*.js`,
        `./app/dev/scripts/**/*.js`,
    ])
    .pipe(jsLinter({
        parserOptions: {
            ecmaVersion: 2017,
            sourceType: `module`
        },
        rules: {
            indent: [2, 4, {SwitchCase: 1}],
            quotes: [2, `backtick`],
            semi: [2, `always`],
            'linebreak-style': [2, `unix`],
            'max-len': [1, 85, 4]
        },
        env: {
            es6: true,
            node: true,
            browser: true
        },
        extends: `eslint:recommended`
    }))
    .pipe(jsLinter.formatEach(`compact`, process.stderr));
}

module.exports = linterJS