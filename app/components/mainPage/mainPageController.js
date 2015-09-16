(function (angular) {
    ////AngularJS Code ////
    angular.module('cpControllers').controller('mainPageController', ['$scope', '$location', '$sce', 'songHistoryFactory', mainPageController]);

    function mainPageController($scope, $location, $sce, songHistoryFactory) {
        console.log("inside MainController");
        var vm = this
        vm.scope = $scope;
        vm.recents = songHistoryFactory.getRecentSongs();
        vm.scope.$on('tackSelectedEmitEvent', function( event, data ){
  vm.scope.$broadcast( 'tackSelectedBroadcastEvent', data ); //recives url - emit from searchpanel controller and broadcasts down to cloud player (listener)
});
        SC.initialize({
            client_id: "d652006c469530a4a7d6184b18e16c81"
        });
    }
})(angular);
