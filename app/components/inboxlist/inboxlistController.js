(function() {
    var module = {
        name: 'angularEmailClient.inboxlist',
        dependencies: [],
        config: {
            providers: ['$stateProvider', '$urlRouterProvider']
        },
        inboxlistController: {
            name: 'inboxlistController',
            injectables: ['page', 'emails', '$http', '$interval']
        }
    };
    var InboxlistConfig = function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.inbox', {
                url: '/inbox',
                templateUrl: './app/components/inboxlist/inboxlist.html',
                controller: module.inboxlistController.name + ' as inboxlist',
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
            });
    };

    InboxlistConfig.$provide = module.config.providers;


    var InboxlistController = function(page, emails, $http, $interval, $filter) {
        var self = this;
        self.title = page.title;
        self.emails = emails;

        var updateTime = +(localStorage.getItem('updateTime') || 5000);

        self.deleteEmail = function(emailid) {
            if (confirm('Are you sure you want to delete this email?')) {
                $http.delete('/api/emails/' + emailid)
                    .success(function(data) {
                        var index = -1;
                        self.emails.forEach(function(value, _index) {
                            if (value.id === data.id) {
                                index = _index;
                                return false;
                            }
                        });
                        self.emails.splice(index, 1);
                    })
                    .error(function(data) {
                        alert('Email not deleted!');
                    });
            }
        };

        var updateEmails = function() {
            $http({
                    method: 'get',
                    url: '/api/emails'
                })
                .then(function(data) {
                    self.emails = data.data;
                });
        };

        $interval(updateEmails, (updateTime * 60000));
    };

    InboxlistController.$inject = module.inboxlistController.injectables;

    angular.module(module.name, module.dependencies)
        .config(InboxlistConfig)
        .controller(module.inboxlistController.name, InboxlistController);
}());
