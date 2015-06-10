angular.module('angularEmailClient.searchHighlight', [])
    .filter('highlight', function($sce) {
        return function(input, search) {
            if (search) {
                input = input.replace(new RegExp('(' + search + ')', 'gi'), '<span class="highlighted">$1</span>');
            }
            return $sce.trustAsHtml(input);
        };
    });
