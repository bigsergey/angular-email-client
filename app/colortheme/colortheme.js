angular.module('angularEmailClient.colortheme', [])
	.directive('colortheme', function() {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {

				color = localStorage.getItem('userColor') || 'black';
				element.addClass(color);

				scope.$on('colortheme:updateColor', function(event, value) {
					element.removeClass(color).addClass(value);
					localStorage.setItem('userColor', value);
					color = value;
				});
			}
		};
	});
