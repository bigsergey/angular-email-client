(function() {
    var module = {
        name: 'angularEmailClient.createmail',
        dependecies: [],
        config: {
            providers: ['$stateProvider', '$urlRouterProvider']
        },
        createmailController: {
            name: 'createmailController',
            injectables: ['email', '$http', '$state']
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
                                    var oldEmail = data.data;
                                    var newEmail = {};
                                    newEmail.receivers = oldEmail.sender;
                                    newEmail.title = 'Re: ' + oldEmail.title;
                                    newEmail.content = (new Date(oldEmail.received)) + ' ' + oldEmail.sender + ':\n' + oldEmail.content + '\n-------------------------------------\n';
                                    return newEmail;
                                }, function() {
                                    return {
                                        'title': '',
                                        'content': '',
                                        'receivers': []
                                    };
                                });
                        } else {
                            return {
                                'title': '',
                                'content': '',
                                'receivers': []
                            };
                        }
                    }
                }
            });
    };

    createmailConfig.$provide = module.config.providers;

    var createmailController = function(email, $http, $state) {
        var self = this;
        self.email = email;

        self.sendEmail = function() {
            self.email.receivers = self.email.receivers.split(/;|,| /g);
            var timestamp = "" + Date.now();
            self.email.sent = timestamp;
            self.email.id = timestamp;
            $http.post('/api/sent', self.email)
                .success(function() {
                    $state.go('app.sent');
                })
                .error(function(data) {
                    alert('Something goes wrong!' + data);
                });

        };
    };

    createmailController.$inject = module.createmailController.injectables;

    angular.module(module.name, module.dependecies)
        .config(createmailConfig)
        .controller(module.createmailController.name, createmailController);

}());
