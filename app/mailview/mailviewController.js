(function() {
    var module = {
        name: 'angularEmailClient.mailview',
        dependecies: [],
        config: {
            providers: ['$stateProvider', '$urlRouterProvider']
        },
        mailviewController: {
            name: 'mailviewController',
            injectables: ['email']
        }
    };
    var MailviewConfig = function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.view', {
                url: '/view/:emailid',
                templateUrl: './app/mailview/mailviewView.html',
                controller: module.mailviewController.name + ' as mailview',
                resolve: {
                    email: function($http, $stateParams) {
                        return $http({
                                method: 'get',
                                url: '/api/emails/' + $stateParams.emailid
                            })
                            .then(function(data) {
                                return data.data;
                            }, function () {
                            	return {};
                            });
                    }
                }
            });
    };

    MailviewConfig.$provide = module.config.providers;

    var mailviewController = function (email) {
    	var self = this;
    	self.email = email;
    };

    mailviewController.$inject = module.mailviewController.injectables;

    angular.module(module.name, module.dependecies)
    	.config(MailviewConfig)
    	.controller(module.mailviewController.name, mailviewController);

}());
