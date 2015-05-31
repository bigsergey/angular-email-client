(function() {
    var module = {
        name: 'angularEmailClient.configview',
        dependecies: [],
        config: {
            providers: ['$stateProvider', '$urlRouterProvider']
        },
        configviewController: {
            name: 'configviewController',
            injectables: []
        }
    };
    var configviewConfig = function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.config', {
                url: '/config',
                templateUrl: './app/config/configView.html',
                controller: module.configviewController.name + ' as configview'

            });
    };

    configviewConfig.$provide = module.config.providers;

    var configviewController = function() {
        var self = this;
        self.colors = ['black', 'red', 'blue'];
        self.updateTime = 1;
    };

    configviewController.$inject = module.configviewController.injectables;

    angular.module(module.name, module.dependecies)
        .config(configviewConfig)
        .controller(module.configviewController.name, configviewController);

}());
