angular.module('angularEmailClient.validateEmails', [])
    .directive('validateEmails', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {

                var regex = /(.+)@(.+){2,}\.(.+){2,}/;

                ctrl.$validators.emaillist = function(modelValue, viewValue) {

                    if (viewValue) {
                        var arr = viewValue.split(/;|,| /g);

                        var valid = true;

                        arr.forEach(function (value) {
                            if (!regex.test(value) && value !== '') {
                                valid = false;
                                return false;
                            }
                        });

                        return valid;
                    }


                    return false;
                };

            }
        };
    });
