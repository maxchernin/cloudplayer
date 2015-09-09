(function(angular){
    var headerDirFn = function() {
        return {
            restrict: 'E',
            templateUrl: 'app/shared/header/header.html'
        }
    }
    angular.module('cpDirectives').directive('cloudplayerHeader', headerDirFn)
})(angular);
