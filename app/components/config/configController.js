(function() {
    var module = {
        name: 'angularEmailClient.configview',
        dependecies: [],
        config: {
            providers: ['$stateProvider', '$urlRouterProvider']
        },
        configviewController: {
            name: 'configviewController',
            injectables: ['$scope']
        }
    };
    var configviewConfig = function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.config', {
                url: '/config',
                templateUrl: './app/components/config/configView.html',
                controller: module.configviewController.name + ' as configview'

            });
    };

    configviewConfig.$provide = module.config.providers;

    var configviewController = function($scope) {
        var self = this;
        self.colors = ['black', 'red', 'blue'];

        self.updateTime = +localStorage.getItem('updateTime') || 1;
        self.userColor = localStorage.getItem('userColor') || 'black';

        self.setUserColor = function(color) {
            self.userColor = color;
            $scope.$emit('colortheme:updateColor', color);
        };

        self.setUpdateTime = function() {
            localStorage.setItem('updateTime', self.updateTime);
        };

    };

    configviewController.$inject = module.configviewController.injectables;

    angular.module(module.name, module.dependecies)
        .config(configviewConfig)
        .controller(module.configviewController.name, configviewController);

}());
