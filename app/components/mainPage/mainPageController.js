(function (angular) {
    ////AngularJS Code ////
    angular.module('cpControllers').controller('mainPageController', ['$scope', '$location', '$sce', 'songHistoryFactory', mainPageController]);

    function mainPageController($scope, $location, $sce, songHistoryFactory) {
        console.log("inside MainController");
//        var this = $scope;
        this.recents = songHistoryFactory.getRecentSongs();
        this.searchResult;
        SC.initialize({
            client_id: "d652006c469530a4a7d6184b18e16c81"
        });
    }
})(angular);