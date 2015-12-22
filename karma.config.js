module.exports = function (config) {

  return config.set({
    basePath: '.',

    browsers: [ 'Chrome' ],

    frameworks: [ 'mocha' ],

    files: [
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
