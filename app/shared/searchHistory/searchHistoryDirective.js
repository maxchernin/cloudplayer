(function(angular){
    angular.module('Directives').directive('searchHistory', searchHistoryDirFn)
    function searchHistoryDirFn(){
        return {
            restrict: 'EA',
            templateUrl: 'app/shared/searchHistory/search-history.html'
        }
    }
})(angular);