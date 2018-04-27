import assert from "assert";
import path from "path";
import webpack from "webpack";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import HtmlWebpackPlugin from 'html-webpack-plugin';

function intree(...parts) {
  const escapedDir = __dirname.replace(/\\/g, "\\\\");
  const escapedSep = path.sep.replace(/\\/g, "\\\\");
  const escapedPath = [escapedDir].concat(parts).join(escapedSep);
  return new RegExp("^" + escapedPath + "$", "i");
}
const APP_PATH = path.join("build");
const DEBUG = process.env.NODE_ENV !== "production";
const PLATFORM = process.env.PLATFORM || "lin64";
const WIN_BUILD = PLATFORM.startsWith("win");
const MAC_BUILD = PLATFORM.startsWith("mac");
const LIN_BUILD = PLATFORM.startsWith("lin");
assert(WIN_BUILD || MAC_BUILD || LIN_BUILD,
       "Unknown platform");
const X64_BUILD = PLATFORM.endsWith("64");
const ExtractLoader = ExtractTextPlugin.extract("css");
const COMMON_PLUGINS = [
  new webpack.DefinePlugin({
    DEBUG,
    WIN_BUILD,
    MAC_BUILD,
    LIN_BUILD,
    X64_BUILD,
  }),
  new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
  }),
  new ExtractTextPlugin("index.css"),
];
const PLUGINS = DEBUG ? COMMON_PLUGINS : COMMON_PLUGINS.concat([
  // This will help minificator to delete debug code.
  // new webpack.DefinePlugin({"process.env.NODE_ENV": '"development"'}),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    output: {comments: false},
    compress: {warnings: false},
  }),

]);

export default {
  // Exit with code on errors.
  bail: !DEBUG,
  // Make electron's virtual modules work.
  target: "electron",
  node: {
    // Don't mess with node's dirname variable.
    __dirname: false,
  },
  externals: [
    // Mute warning.
    "devtron",
    // Brings tons of useless code.
    {"pretty-error": "Error"},
  ],
  entry: {
      "supervisor.min":["./src/client/supervisor/index.js", 'isomorphic-fetch'],
      "display.min":["./src/client/display/index.js", 'isomorphic-fetch'],
      "admin.min":["./src/client/admin/index.js", 'isomorphic-fetch']
  },
  output: {
    path: path.join(__dirname, "public/js"),
    filename: "bundle.[name].js",
  },
  module: {
    loaders: [
      // Latest node is almost ES2015-ready but need to transpile few
      // unsupported features.
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                cacheDirectory: true
            }
        },
      {test: /\.json$/, loader: "json-loader"}
    ],
  },
  fileLoader: {
    name: "[name].[ext]",
  },
  plugins: PLUGINS,
}
