var config = {
  mode: "development",

  entry: "./src/index.tsx",

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".mjs", ".js", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './img/[name].[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ]
  }
};

var rootWebsite = Object.assign({}, config, {
  output: {
    path: __dirname + "/public",
    publicPath: "build/",
    filename: "bundle.js"
  },

});

var istopWebsite = Object.assign({}, config, {
  output: {
    path: __dirname + "/public/istop",
    publicPath: "build/",
    filename: "bundle.js"
  },

});

var lollipopWebsite = Object.assign({}, config, {
  output: {
    path: __dirname + "/public/ddr",
    publicPath: "build/",
    filename: "bundle.js"
  },

});

module.exports = [rootWebsite, istopWebsite, lollipopWebsite]