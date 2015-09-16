(function (angular) {
    "use strict";
    angular.module('cpDirectives').directive('cloudPlayer', playerDirFn)

    function playerDirFn() {
        return {
            restrict: 'EA',
            templateUrl: 'app/shared/player/cloud-player.html',
            controller: 'cloudPlayerController',
            controllerAs: 'cloudPlayerCtrl',
            scope: true,
            link: function (scope, element, attrs, controller) {
            }
        }
    }
})(angular);