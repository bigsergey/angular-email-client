(function() {
    var module = {
        name: 'angularEmailClient',
        dependencies: [
            'ui.router',

            'angularEmailClient.maillist',
            'angularEmailClient.mailview',
            'angularEmailClient.createmail'
        ],
        config: {
            providers: ['$stateProvider', '$urlRouterProvider']
        },
        controller: {
            name: 'AppController',
            injectables: []
        }
    };

    var AppConfig = function($locationProvider, $stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/inbox');

        $stateProvider
            .state('app', {
                abstract: true,
                url: '',
                views: {
                    'body': {
                        template: '<div ui-view></div>'
                    }
                },
                controller: module.controller.name + ' as app'
            });
    };

    AppConfig.$provide = module.config.providers;

    var AppController = function() {};

    AppController.$inject = module.controller.injectables;

    angular.module(module.name, module.dependencies)
        .config(AppConfig)
        .controller(module.controller.name, AppController);
}());
