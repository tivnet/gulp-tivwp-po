# gulp-tivwp-po

## THIS IS NOT A COMPLETE GULP PACKAGE

### Usage example (Gulp 5)

```
import { src } from 'gulp';
import print from 'gulp-print';
import tivwpPO from './gulp-tivwp-po.mjs';
import cfg from './cfg.json' with { type: 'json' };
import pkg from '../package.json' with { type: 'json' };

// noinspection JSUnresolvedReference
const out = print.default;

const task_pomo = function() {
	return src(cfg.path.languages + "/*.po")
		.pipe(tivwpPO({
			potFile: cfg.path.languages + "/" + pkg.name + ".pot"
		}))
		.pipe(out());
};

export default task_pomo;

```

### Usage example (Gulp 4)

```
var tivwpPOMO = require("./gulp-tivwp-po");

gulp.task("tivwp_pomo", function () {
    return gulp.src("./languages/*.po")
        .pipe(tivwpPOMO({
            potFile: "./languages/my-plugin.pot"
        }));
});
```
