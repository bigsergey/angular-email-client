(function() {
    var module = {
        name: 'angularEmailClient.sentlist',
        dependencies: [],
        config: {
            providers: ['$stateProvider', '$urlRouterProvider']
        },
        sentlistController: {
            name: 'sentlistController',
            injectables: ['page', 'emails', '$http', '$interval']
        }
    };
    var sentlistConfig = function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.sent', {
                url: '/sent',
                templateUrl: './app/components/sentlist/sentlist.html',
                controller: module.sentlistController.name + ' as sentlist',
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

    sentlistConfig.$provide = module.config.providers;


    var SentlistController = function(page, emails, $http, $interval, $filter) {
        var self = this;
        self.title = page.title;
        self.emails = emails;
    };

    SentlistController.$inject = module.sentlistController.injectables;

    angular.module(module.name, module.dependencies)
        .config(sentlistConfig)
        .controller(module.sentlistController.name, SentlistController);
}());
