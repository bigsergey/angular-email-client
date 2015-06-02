angular.module('angularEmailClient.search', [])
    .directive('search', function() {
        return {
            restrict: 'E',
            scope: {
                bindModel: '=ngModel'
            },
            templateUrl: './app/search/searchView.html',
            link: function(scope, element, attrs) {

            }
        };
    });
