module.exports = {
  // Don't try to find .babelrc because we want to force this configuration.
  babelrc: false,
  // This is a feature of `babel-loader` for webpack (not Babel itself).
  // It enables caching results in OS temporary directory for faster rebuilds.
  cacheDirectory: true,
  presets: [
    "es2015",
    "react"
  ],
  env: {
    start: {
      presets: [
        "react-hmre"
      ]
    }
  }
};
