module.exports = function (config) {

  return config.set({
    basePath: '.',

    browsers: [ 'Chrome' ],

    frameworks: [ 'mocha' ],

    files: [
      './node_modules/babel-polyfill/browser.js',
      './test/**/*.test.js*',
      './test/index.html'
    ],

    preprocessors: {
      './test/**/*.test.js*': ['webpack'],
      '**/*.html': ['html2js']
    },

    reporters: [ 'mocha' ],

    webpack: require('./webpack.config'),

    webpackMiddleware: {
      noInfo: true
    }

  })

}
