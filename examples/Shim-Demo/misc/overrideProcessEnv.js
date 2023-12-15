var __assign = function () {
  __assign =
    Object.assign ||
    function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
  return __assign.apply(this, arguments);
};
var findWebpackPlugin = function (plugins, pluginName) {
  return plugins.find(function (plugin) {
    return plugin.constructor.name === pluginName;
  });
};
var overrideProcessEnv = function (value) {
  return function (config) {
    var plugin = findWebpackPlugin(config.plugins, 'DefinePlugin');
    var processEnv = plugin.definitions['process.env'] || {};
    plugin.definitions = __assign(__assign({}, processEnv), value);
    return config;
  };
};
exports.overrideProcessEnv = overrideProcessEnv;
