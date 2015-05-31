angular.module('angularEmailClient.sidebar', [])
    .directive('sidebar', function() {
        return {
            restrict: 'E',
            templateUrl: './app/sidebar/sidebarView.html',
            link: function(scope, element, attrs) {
            	console.log('sidebar directive');
            }
        };
    });
