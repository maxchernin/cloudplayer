(function(angular){
    var headerDirFn = function() {
        return {
            restrict: 'E',
            templateUrl: 'app/shared/header/header.html'
        }
    }
    angular.module('Directives').directive('cloudplayerHeader', headerDirFn)
})(angular);
