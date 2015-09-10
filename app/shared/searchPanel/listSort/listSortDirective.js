(function(angular){
    angular.module('cpDirectives').directive('listSort', listSortDirFn)
    function listSortDirFn(){
        return {
            restrict: 'EA',
        template: '<li class="alert alert-info no-bullets" ng-repeat="song in searchPanelCtrl.searchResult" ng-click="searchPanelCtrl.selectSong(song)"> {{song.title}} </li>'
        }
    }
})(angular);