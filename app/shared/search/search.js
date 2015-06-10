angular.module('angularEmailClient.search', [])
    .directive('search', function() {
        return {
            restrict: 'E',
            scope: {
                bindModel: '=ngModel'
            },
            templateUrl: './app/shared/search/searchView.html',
            link: function(scope, element, attrs) {
                scope.searchHistory = [];
                scope.hideAutocomplete = true;
                element.bind("keydown keypress", function(event) {
                    if (event.which === 13) {
                        if (scope.searchHistory.indexOf(scope.bindModel) === -1) {
                            scope.$apply(function() {
                                scope.searchHistory.push(scope.bindModel);
                            });
                        }

                        event.preventDefault();
                    }
                });
                scope.setCurrentValue = function (value) {
                    scope.bindModel = value;
                    scope.hideAutocomplete = true;
                };
            }
        };
    });
