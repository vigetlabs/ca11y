module.exports = {
  context: __dirname + "/src",
  debug: 'source-map',
  entry: {
    demo: "./demo"
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ["es2015"],
          plugins: ["transform-object-assign"]
        }
      }
    ]
  }
}
