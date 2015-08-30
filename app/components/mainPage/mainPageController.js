(function (angular) {
    ////AngularJS Code ////
    angular.module('Controllers').controller('mainPageController', ['$scope', '$location', '$sce', 'songHistoryFactory', mainPageController]);

    function mainPageController($scope, $location, $sce, songHistoryFactory) {
        console.log("inside MainController");
        this.scope = $scope;
        this.defualtPicPath = "assets/images/soundcloud.png"
        this.isSelected = false;
        this.recents = songHistoryFactory.getRecentSongs();
        this.selectedWidgetUrl = '';
        this.searchResult;
        this.listViewSelector;
        var nextPage = ''
        var pageSize = 6;
        var userInput = '';
        //        $scope.listViewSelector = songHistoryFactory.getListViewSelector();

        SC.initialize({
            client_id: "d652006c469530a4a7d6184b18e16c81"
        });
        this.setResults = function (tracks) {
                var self = this
                console.log("setResults(tracks) running");
                this.searchResult = tracks.collection;
                this.searchResult.forEach(function (item) {
                    if (item.artwork_url == null) {
                        item.artwork_url = self.defualtPicPath
                    }
                })
                this.scope.$apply();
                console.log(this.searchResult)
                    //                this.scope.$apply()
                nextPage = tracks.next_href;
                console.log("setResults finished.")
            }
            //        this method retrives all songs with string taken form input field plus saves the search
        this.getSongs = function () {
                console.log("getSongs() running...")
                console.log("search added: " + this.userInput)
                var self = this
                SC.get('/tracks', {
                    q: this.userInput,
                    'limit': pageSize,
                    'linked_partitioning': 1,
                }, function (tracks) {
                    self.setResults(tracks)
                });
                songHistoryFactory.addSongToRecents(this.userInput)
                console.log("Song List:");
                console.log(this.searchResult);
                this.listViewSelector = songHistoryFactory.getListViewSelector();
            }
            //                sets selected song by user click on a song item from list, also sets a defualt photo if no artwork exists
        this.selectSong = function (selectedSong) {
            console.log("selectSong(selectedSong) running... ")
            this.selected = selectedSong;
            this.isSelected = true;
            this.selectedWidgetUrl = $sce.trustAsResourceUrl("https://w.soundcloud.com/player/?url=" + this.selected.uri + "&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true")
            console.log(self.selectedWidgetUrl)
            console.log("isSelected? " + this.isSelected)
        }
        this.onClickNextBtn = function () {
            var self = this;
            console.log(this.searchResult)
            console.log(this.selectedWidgetUrl)
            console.log("onClickNextBtn() running...")
            SC.get(nextPage, function (tracks) {
                self.setResults(tracks);

            })
        }
        this.changeView = function () {
            console.log("changeView running...")
            songHistoryFactory.setListViewSelector()
            this.listViewSelector = songHistoryFactory.getListViewSelector();
            console.log("listviewselector= " + this.listViewSelector)

        }
    }
})(angular);