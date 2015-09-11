(function (angular) {
    "use strict";
    angular.module('cpDirectives').directive('cloudPlayer', playerDirFn)

    function playerDirFn() {
        return {
            restrict: 'EA',
            templateUrl: 'app/shared/player/cloud-player.html',
//            scope: {
//            },
//            bindToController: true,
            link: function (scope, element, attrs, controller) {
            }
        }
    }
})(angular);