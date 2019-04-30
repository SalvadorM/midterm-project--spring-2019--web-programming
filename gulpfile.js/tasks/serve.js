const { series, watch } = require(`gulp`)
const browserSync = require(`browser-sync`)
const reload = browserSync.reload

const serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 100,
        server: {
            baseDir: [`app/dev`]
        }
    })
    watch([
        `./**/*.html`,
        `./**/*.js`,
        './**/*.scss'
    ],series([`compileCSSForDev`, `linterJS`]))
    .on(`change`, reload)
}

module.exports = serve 

