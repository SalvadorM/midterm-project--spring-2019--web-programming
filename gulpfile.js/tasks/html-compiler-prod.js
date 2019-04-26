const { src, dest } = require('gulp')
const HTMLCompressor = require(`gulp-htmlmin`)


const compileHTMLForProd = () => {

    return src([
        `./app/dev/*.html`,
        `./app/dev/**/*.html`])
        .pipe(HTMLCompressor({
            removeComments: true,
            collapseWhitespace: true
        }))
        .pipe(dest(`./app/prod/compressed-html`))
}

module.exports = compileHTMLForProd