const { src, dest } = require(`gulp`);
const cache = require(`gulp-cache`);
const imageCompressor = require(`gulp-imagemin`);

let compressImages = () => {

    return src([
        `./app/dev/images/**/*`,
    ])
        .pipe(cache(
            imageCompressor()
        ))
        .pipe(dest(`./app/prod/images`));
};

exports.compressImages = compressImages;