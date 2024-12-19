const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  devServer: {
    port: 3003,
    open: false,
  },
  webpack: {
    plugins: {
      add: [
        new ModuleFederationPlugin({
          name: "starwindPluginC",
          filename: "remoteEntry.js",
          library: { type: "var", name: "starwindPluginC" },
          exposes: {
            "./App": "./src/App.js",
          },
          shared: {
            react: {
              singleton: true,
              requiredVersion: "^18.0.0",
              eager: false,
            },
            "react-dom": {
              singleton: true,
              requiredVersion: "^18.0.0",
              eager: false,
            },
            "react-dom/client": {
              singleton: false,
              requiredVersion: "^18.0.0",
              eager: false,
            },
          },
        }),
      ],
    },
    configure: (webpackConfig) => ({
      ...webpackConfig,
      output: {
        ...webpackConfig.output,
        publicPath: "auto",
      },
    }),
  },
};
