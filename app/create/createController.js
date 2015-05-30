(function() {
    var module = {
        name: 'angularEmailClient.createmail',
        dependecies: [],
        config: {
            providers: ['$stateProvider', '$urlRouterProvider']
        },
        createmailController: {
            name: 'createmailController',
            injectables: ['email']
        }
    };
    var createmailConfig = function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.create', {
                url: '/create/:emailid',
                templateUrl: './app/create/createView.html',
                controller: module.createmailController.name + ' as createmail',
                resolve: {
                    email: function($http, $stateParams) {
                        if ($stateParams.emailid) {
                            return $http({
                                    method: 'get',
                                    url: '/api/emails/' + $stateParams.emailid
                                })
                                .then(function(data) {
                                    return data.data;
                                }, function () {
                                    return {};
                                });
                        } else {
                            return {};
                        }
                    }
                }
            });
    };

    createmailConfig.$provide = module.config.providers;

    var createmailController = function (email) {
    	var self = this;
    	self.email = email;
    };

    createmailController.$inject = module.createmailController.injectables;

    angular.module(module.name, module.dependecies)
    	.config(createmailConfig)
    	.controller(module.createmailController.name, createmailController);

}());
