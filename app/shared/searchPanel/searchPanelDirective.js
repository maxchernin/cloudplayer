(function(angular){
    angular.module('cpDirectives').directive('searchPanel', searchPanelDirFn)
    function searchPanelDirFn(){
        return{
            restrict: 'EA',
            templateUrl: 'app/shared/searchPanel/search-panel.html',
            controller: 'searchPanelController',
            controllerAs: 'searchPanelCtrl',
//            scope: {},
            link: function(scope, element, attrs, mainPageControllerController){
                console.log("link function of searchPanelDirective");
            }
        }
    }
})(angular);