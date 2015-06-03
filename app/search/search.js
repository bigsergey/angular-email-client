angular.module('angularEmailClient.search', [])
    .directive('autocomnpete', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                tags: '=',
                currentValue: '='
            },
            templateUrl: './app/search/autocomplete.html',
            link: function(scope, element, attrs) {

            }
        };
    })
    .directive('search', function() {
        return {
            restrict: 'E',
            scope: {
                bindModel: '=ngModel'
            },
            templateUrl: './app/search/searchView.html',
            link: function(scope, element, attrs) {
                scope.searchHistory = [];
                element.bind("keydown keypress", function(event) {
                    if (event.which === 13) {
                        if (scope.searchHistory.indexOf(scope.bindModel)) {
                            scope.$apply(function() {
                                scope.searchHistory.push(scope.bindModel);
                            });
                        }

                        event.preventDefault();
                    }
                });
            }
        };
    });
