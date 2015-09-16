(function(angular){
    var headerDirFn = function() {
        return {
            restrict: 'E',
            templateUrl: 'app/shared/header/header.html',
            scope: {
                title:'@',
                description:'@'
            },
            link: function(scope, element, attrs){
            }
        }
    }
    angular.module('cpDirectives').directive('cloudplayerHeader', headerDirFn)
})(angular);
