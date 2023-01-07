module.exports = function (api) {
  api.cache(true);

  const presets = [
    "babel-preset-expo",
    "module:metro-react-native-babel-preset",
  ];
  const plugins = ["react-native-reanimated/plugin"];

  return {
    presets,
    plugins,
  };
};
