// gulp基于流，适合小任务，配置简单
// rollup 适合前端的库
// webpack 前端打包工具 bundle
// 打包nodejs，并将生成的结果放到 dist 目录下;
const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const rollup = require('gulp-rollup');
const replace = require('rollup-plugin-replace');
const eslint = require('gulp-eslint');
// 入口文件
const entries = __dirname + '/src/service/**/*.js';
// 需要清理的文件
const clearEntries = __dirname + '/src/service/config/index.js';

// 开发环境
function buildDev () {
  return watch(entries, { ignoreInitial: false }, function () {
    gulp.src(entries)
      .pipe(babel({
        babelrc: false,
        plugins: ["@babel/plugin-transform-modules-commonjs"]
      }))
      .pipe(gulp.dest('dist'));
  });
}
// 生产环境
function buildProd () {
  return gulp.src(entries)
    .pipe(babel({
      babelrc: false,
      ignore: [clearEntries],
      plugins: ["@babel/plugin-transform-modules-commonjs"]
    }))
    .pipe(gulp.dest('dist'));
}
// 清洗流
function buildClear () {
  return gulp.src(entries)
    .pipe(rollup({
      plugins: [
        replace({
          "process.env.NODE_ENV": JSON.stringify("production")
        })
      ],
      input: clearEntries,
      output: {
        format: 'cjs'
      }
    }))
    .pipe(gulp.dest('./dist'));
}
// hint 代码校验
function buildHint () {
  return gulp.src(entries)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

let build = gulp.series(buildDev);

if ('production' === process.env.NODE_ENV) {
  build = gulp.series(buildHint, buildProd, buildClear);
}
if ('hint' === process.env.NODE_ENV) {
  build = gulp.series(buildHint);
}

gulp.task('default', build);
