(function(angular){
    angular.module('Directives').directive('listSort', listSortDirFn)
    function listSortDirFn(){
        return {
            restrict: 'EA',
        template: '<li class="alert alert-info no-bullets" ng-repeat="song in searchResult" ng-click="selectSong(song)"> {{song.title}} </li>'
        }
    }
})(angular);