(function (angular){
    angular.module('Directives').directive('tileSort', tileSortDirFn)

    function tileSortDirFn(){
        return {
            restrict: 'EA',
            templateUrl: 'app/shared/searchPanel/tileSort/tile-sort.html',
        }
    }
})(angular);
