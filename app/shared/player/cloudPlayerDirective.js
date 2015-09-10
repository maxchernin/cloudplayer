(function(angular){
    "use strict";
    angular.module('cpDirectives').directive('cloudPlayer', playerDirFn)
    function playerDirFn(){
        return{
            restrict: 'EA',
            templateUrl: 'app/shared/player/cloud-player.html',
        }
    }
})(angular);
