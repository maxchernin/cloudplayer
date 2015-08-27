(function (angular) {
    ////AngularJS Code ////
    angular.module('Controllers').controller('mainPageController', ['$scope', '$location', '$sce', 'songHistoryFactory', mainPageController]);

    function mainPageController($scope, $location, $sce, songHistoryFactory) {
        $scope.defualtPicPath = "assets/images/soundcloud.png"
        $scope.isSelected = false;
        $scope.recents = songHistoryFactory.getRecentSongs();
        $scope.selectedWidgetUrl = '';
        var nextPage = ''
        var pageSize = 6;
//        $scope.listViewSelector = songHistoryFactory.getListViewSelector();

        SC.initialize({
            client_id: "d652006c469530a4a7d6184b18e16c81"
        });
        var setResults = function (tracks) {
                $scope.searchResult = tracks.collection;
                $scope.$apply()
                nextPage = tracks.next_href;
            }
            //        this method retrives all songs with string taken form input field plus saves the search
        $scope.getSongs = function () {
                SC.get('/tracks', {
                    q: $scope.userInput,
                    'limit': pageSize,
                    'linked_partitioning': 1,
                }, function (tracks) {
                    setResults(tracks)
                });
                songHistoryFactory.addSongToRecents($scope.userInput)
                $scope.listViewSelector = songHistoryFactory.getListViewSelector();
            }
            //                sets selected song by user click on a song item from list, also sets a defualt photo if no artwork exists
        $scope.selectSong = function (selectedSong) {
            $scope.selected = selectedSong;
            if ($scope.selected.artwork_url == null) {
                $scope.selected.artwork_url = $scope.defualtPicPath
            }
            $scope.isSelected = true;
            $scope.selectedWidgetUrl = $sce.trustAsResourceUrl("https://w.soundcloud.com/player/?url=" + $scope.selected.uri + "&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true")
        }
        $scope.onClickNextBtn = function () {
            SC.get(nextPage, function (tracks) {
                setResults(tracks);

            })
        }
        $scope.changeView = function(){
            console.log("list change clicked")
            songHistoryFactory.setListViewSelector()
            $scope.listViewSelector = songHistoryFactory.getListViewSelector();
        }
    }
})(angular);