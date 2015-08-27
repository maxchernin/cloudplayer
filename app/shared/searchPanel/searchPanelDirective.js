(function(angular){
    angular.module('Directives').directive('searchPanel', searchPanelDirFn)
    function searchPanelDirFn(){
        return{
            restrict: 'EA',
            templateUrl: 'app/shared/searchPanel/search-panel.html'
        }
    }
})(angular);