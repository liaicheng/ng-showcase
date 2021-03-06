angular.module('ngShowcaseApp').config(function($stateProvider, $urlRouterProvider, NavData) {
  $urlRouterProvider.when('', '/home/main');
  $urlRouterProvider.when('/', '/home/main');
  $urlRouterProvider.otherwise('/notFound');
  $stateProvider.state('notFound', {
    url: '/notFound',
    controller: 'ctrl.notFound',
    templateUrl: 'views/home/notFound.html'
  });
  var states = [];
  // 把多级state弄成单级的，并自动补充父级路由，方便后续处理
  _.each(NavData, function(group) {
    _.each(group.items, function(item) {
      // 处理多级state，自动添加各个父级state
      var paths = item.state.split(/\./g);
      var currentPath = '';
      _.each(paths, function(path) {
        currentPath += path;
        states.push(currentPath);
        currentPath += '.'
      });
    });
  });
  // 去重，免得重新注册了路由
  states = _.unique(states);
  // 遵循约定优于配置的原则自动批量注册路由
  _.each(states, function(state) {
    var path = state.replace(/\./g, '/');
    var lastState = state.match(/(\w+)$/)[0];
    $stateProvider.state(state, {
      url: '/' + lastState,
      controller: 'ctrl.' + state,
      templateUrl: 'views/' + path + '.html'
    });
  });
});
