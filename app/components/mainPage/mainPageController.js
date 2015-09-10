(function (angular) {
    ////AngularJS Code ////
    angular.module('cpControllers').controller('mainPageController', ['$scope', '$location', 'songHistoryFactory', mainPageController]);

    function mainPageController($scope, $location, songHistoryFactory) {
        console.log("inside MainController");
        this.recents = songHistoryFactory.getRecentSongs();
        this.searchResult;
        SC.initialize({
            client_id: "d652006c469530a4a7d6184b18e16c81"
        });

    }
})(angular);
