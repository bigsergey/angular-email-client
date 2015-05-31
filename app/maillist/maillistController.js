(function() {
    var module = {
        name: 'angularEmailClient.maillist',
        dependencies: [],
        config: {
            providers: ['$stateProvider', '$urlRouterProvider']
        },
        maillistController: {
            name: 'maillistController',
            injectables: ['page', 'emails', '$http', '$timeout']
        }
    };
    var MaillistConfig = function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.inbox', {
                url: '/inbox',
                templateUrl: './app/maillist/maillistView.html',
                controller: module.maillistController.name + ' as maillist',
                resolve: {
                    emails: function($http) {
                        return $http({
                                method: 'get',
                                url: '/api/emails'
                            })
                            .then(function(data) {
                                return data.data;
                            });
                    },
                    page: function() {
                        return {
                            title: 'Inbox mails'
                        };
                    }
                }
            })
            .state('app.sent', {
                url: '/sent',
                templateUrl: './app/maillist/maillistView.html',
                controller: module.maillistController.name + ' as maillist',
                resolve: {
                    emails: function($http) {
                        return $http({
                                method: 'get',
                                url: '/api/sent'
                            })
                            .then(function(data) {
                                return data.data;
                            });
                    },
                    page: function() {
                        return {
                            title: 'sent mails'
                        };
                    }
                }
            });
    };

    MaillistConfig.$provide = module.config.providers;


    var maillistController = function(page, emails, $http, $timeout) {
        var self = this;
        self.title = page.title;
        self.emails = emails;

        self.deleteEmail = function(emailid, index) {
            if (confirm('Are you sure you want to delete this email?')) {
                $http.delete('/api/emails/' + emailid)
                    .success(function(data) {
                        self.emails.splice(index, 1);
                    })
                    .error(function(data) {
                        alert('Email not deleted!');
                    });
            }
        };
    };

    maillistController.$inject = module.maillistController.injectables;

    angular.module(module.name, module.dependencies)
        .config(MaillistConfig)
        .controller(module.maillistController.name, maillistController);
}());
