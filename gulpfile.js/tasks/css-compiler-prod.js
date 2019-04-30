const {src, dest} = require(`gulp`)
const CSScompiler = require(`gulp-sass`)

const compileCSSForProd = () => {
    return src([
            `./app/dev/styles/*.scss`,
            `./app/dev/styles/**/*.scss`])
            .pipe(CSScompiler({
                outputStyle: `compressed`,
                precision: 10,
            }))
            .on(`error`, CSScompiler.logError)
            .pipe(dest(`./app/prod/css`))
    }
    

module.exports = compileCSSForProd