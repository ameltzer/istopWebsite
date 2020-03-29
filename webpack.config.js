module.exports = {
  mode: "development",

  entry: "./src/index.tsx",

  output: {
    path: __dirname + "/public",
    publicPath: "build/",
    filename: "bundle.js"
  },

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
