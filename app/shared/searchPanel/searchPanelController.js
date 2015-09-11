(function (angular) {
    angular.module('cpControllers').controller('searchPanelController', ['$scope', '$location', '$sce', 'songHistoryFactory', 'notifier', searchPanelController])

    function searchPanelController($scope, $location, $sce, songHistoryFactory, notifier) {
        console.log("search panel directive controller");
        this.scope = $scope;
        var nextPage = ''
        var pageSize = 9;
        var userInput = '';
        this.userInput = "ACDC"; // just for initial loading
        this.listViewSelector;
        this.panelFoldSelector = false;
        this.isTrackSelected = false;
        this.searchResult;
        this.selectedWidgetUrl;
        this.defualtPicPath = "assets/images/soundcloud.png";
        this.getDatetime = new Date();
        this.getSongs = function () { //        this method retrives all songs with string taken form input field plus saves the search
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
            songHistoryFactory.addSongToRecents(this.userInput, this.getDatetime, this.selectedWidgetUrl)
            console.log("Song List:");
            console.log(this.searchResult);
            this.listViewSelector = songHistoryFactory.getListViewSelector();
        }
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
        this.selectSong = function (selectedSong) {
                console.log("selectSong(selectedSong) running... ")
                this.selected = selectedSong;
                this.isTrackSelected = true;
                this.selectedWidgetUrl = $sce.trustAsResourceUrl("https://w.soundcloud.com/player/?url=" + this.selected.uri + "&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true");
                console.log("https://w.soundcloud.com/player/?url=" + this.selected.uri + "&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true")
                console.log("isSelected? " + this.isSelected)
                this.panelFoldSelector = true;
                notifier.clickedSongnotify(selectedSong);
            } // sets selected song by user click on a song item from list, also sets a defualt photo if no artwork exists
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
            console.log(this.panelFoldSelector)
            console.log("changeView running...")
            songHistoryFactory.setListViewSelector()
            this.listViewSelector = songHistoryFactory.getListViewSelector();
            console.log("listviewselector= " + this.listViewSelector)

        }
    }
})(angular);