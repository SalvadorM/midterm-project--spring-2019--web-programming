const {src, dest} = require(`gulp`)
const CSScompiler = require(`gulp-sass`)

const compileCSSForDev = () => {
return src([
        `./app/dev/styles/*.scss`,
        `./app/dev/styles/**/*.scss`])
        .pipe(CSScompiler({
            outputStyle: `expanded`,
            precision: 10,
        }))
        .on(`error`, CSScompiler.logError)
        .pipe(dest([`app/dev/css`,]))
}
module.exports = compileCSSForDev