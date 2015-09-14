(function (angular) {
    ////AngularJS Code ////
    angular.module('cpControllers').controller('mainPageController', ['$scope', '$location', '$sce', 'songHistoryFactory', mainPageController]);

    function mainPageController($scope, $location, $sce, songHistoryFactory) {
        console.log("inside MainController");
        var vm = this
        vm.scope = $scope;
        vm.recents = songHistoryFactory.getRecentSongs();
        vm.scope.$on('trackUrlSelectedEvent', function( event, data ){
  vm.scope.$broadcast( 'trackUrlBroadcastEvent', data );
});
        SC.initialize({
            client_id: "d652006c469530a4a7d6184b18e16c81"
        });
    }
})(angular);