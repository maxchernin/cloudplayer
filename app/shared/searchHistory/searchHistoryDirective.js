(function(angular){
    angular.module('cpDirectives').directive('searchHistory', searchHistoryDirFn)
    function searchHistoryDirFn(){
        return {
            restrict: 'EA',
            transclude: true,
            templateUrl: 'app/shared/searchHistory/search-history.html',
            scope: {
                recents:'='
            }
        }
    }
})(angular);