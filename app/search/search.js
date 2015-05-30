angular.module('angularEmailClient.search', [])
    .directive('search', function() {
        return {
            restrict: 'E',
            templateUrl: './app/search/search.html',
            link: function(scope, element, attrs) {
            	console.log('Search directive');
            }
        };
    });
