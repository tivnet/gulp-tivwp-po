# gulp-tivwp-po

## THIS IS NOT A COMPLETE GULP PACKAGE

### Usage example

```
var tivwpPOMO = require("./gulp-tivwp-po");

gulp.task("tivwp_pomo", function () {
    return gulp.src("./languages/*.po")
        .pipe(tivwpPOMO({
            potFile: "./languages/my-plugin.pot"
        }));
});
```
