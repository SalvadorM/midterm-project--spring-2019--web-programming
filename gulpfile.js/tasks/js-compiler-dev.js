const {src, dest} = require(`gulp`)
const babel = require(`gulp-babel`);

const compileJSForDev = () => {
    return src([
        `./app/dev/scripts/*.js`,
        `./app/dev/scripts/**/*.js`])
        .pipe(babel({
			presets: ['@babel/preset-env']
		}))
        .pipe(dest(`./app/prod/scripts`))

}

module.exports = compileJSForDev