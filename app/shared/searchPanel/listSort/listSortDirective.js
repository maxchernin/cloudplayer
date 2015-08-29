(function(angular){
    angular.module('Directives').directive('listSort', listSortDirFn)
    function listSortDirFn(){
        return {
            restrict: 'EA',
        template: '<li class="alert alert-info no-bullets" ng-repeat="song in mainPageCtrl.searchResult" ng-click="mainPageCtrl.selectSong(song)"> {{song.title}} </li>'
        }
    }
})(angular);