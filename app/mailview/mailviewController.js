(function() {
    var module = {
        name: 'angularEmailClient.mailview',
        dependecies: [],
        config: {
            providers: ['$stateProvider', '$urlRouterProvider']
        },
        mailviewController: {
            name: 'mailviewController',
            injectables: ['email', '$http', '$state']
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
                            }, function() {
                                return {};
                            });
                    }
                }
            });
    };

    MailviewConfig.$provide = module.config.providers;

    var mailviewController = function(email, $http, $state) {
        var self = this;
        self.email = email;

        if (!self.email.read) {
            $http.put('/api/emails/' + self.email.id, {
                    read: true
                })
                .success(function() {
                    self.email.read = true;
                });
        }

        self.deleteMe = function() {
            if (confirm('Are you sure you want to delete this email?')) {
                $http.delete('/api/emails/' + self.email.id)
                    .success(function(data) {
                        $state.go('app.inbox');
                    })
                    .error(function(data) {
                        alert('Email not deleted!');
                    });
            }
        };

    };

    mailviewController.$inject = module.mailviewController.injectables;

    angular.module(module.name, module.dependecies)
        .config(MailviewConfig)
        .controller(module.mailviewController.name, mailviewController);

}());
