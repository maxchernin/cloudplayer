(function (angular){
    angular.module('cpDirectives').directive('tileSort', tileSortDirFn)

    function tileSortDirFn(){
        return {
            restrict: 'EA',
            templateUrl: 'app/shared/searchPanel/tileSort/tile-sort.html',
            scope:true
        }
    }
})(angular);
