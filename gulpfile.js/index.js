const { series } = require('gulp')


exports.compileCSSForDev = require('./tasks/css-compiler-dev');

//gulp build 
exports.build = series(
    require('./tasks/css-compiler-prod'),
    require(`./tasks/html-compiler-prod`),
    require(`./tasks/lint-js`),
    require('./tasks/js-compiler-prod'),
)

//gulp default 
exports.default = series(
    require(`./tasks/validateHTML`),
    require('./tasks/css-compiler-dev'),
    require('./tasks/js-compiler-dev'),
    require(`./tasks/serve`)
)