const { src } = require(`gulp`)
const htmlValidator = require(`gulp-html`)

const validateHTML = () => {
    return src([
        `./app/dev/*.html`,
        `./app/dev/**/*.html`])
        .pipe(htmlValidator())
}

module.exports = validateHTML