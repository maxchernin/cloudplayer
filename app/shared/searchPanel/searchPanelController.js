(function (angular) {
    angular.module('cpControllers').controller('searchPanelController', ['$scope', '$location', '$sce', 'songHistoryFactory', 'notifier', searchPanelController])

    function searchPanelController($scope, $location, $sce, songHistoryFactory, notifier) {
        console.log("search panel directive controller");
        var vm = this;
        vm.scope = $scope;
        var nextPage;
        var pageSize = 9;
        var widgetAttrs = "&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"
        vm.defualtPicPath = "assets/images/soundcloud.png";
        vm.userInput = "ACDC"; // just for initial loading
        vm.listViewSelector; // assigned from service to remember the last state
        vm.panelFoldSelector = false;
        vm.searchResult;
        vm.selectedWidgetUrl; // to be broadcasted up the scopes and back to the cloudplayer ctrl
        vm.getSongs = getSongs;
        var setResults = setResults;
        vm.selectSong = selectSong;
        vm.onClickNextBtn = onClickNextBtn;
        vm.changeView = changeView;

        function getSongs() { // this method retrives all songs with string taken form input field plus saves the search to the history service
            console.log("getSongs() running...")
            console.log("search added: " + vm.userInput)
            var self = this
            SC.get('/tracks', {
                q: self.userInput,
                'limit': pageSize,
                'linked_partitioning': 1,
            }, function (tracks) {
                setResults(tracks)
            });
            songHistoryFactory.addSongToRecents(vm.userInput, vm.selectedWidgetUrl)
            console.log("Song List:");
            console.log(vm.searchResult);
            vm.listViewSelector = songHistoryFactory.getListViewSelector();
            notifier.displayGeneralInfoMsg("Results for " + vm.userInput);
        }

        function setResults(tracks) {
            var self = this
            console.log("setResults(tracks) running");
            vm.searchResult = tracks.collection;
            vm.searchResult.forEach(function (item) {
                if (item.artwork_url == null) {
                    item.artwork_url = vm.defualtPicPath
                }
            })
            vm.scope.$apply();
            console.log(self.searchResult)
                //                this.scope.$apply()
            nextPage = tracks.next_href;
            console.log("setResults finished.")
        }

        function selectSong(selectedSong) {
            console.log("selectSong(selectedSong) running... ")
            vm.selectedWidgetUrl = $sce.trustAsResourceUrl("https://w.soundcloud.com/player/?url=" + selectedSong.uri + widgetAttrs);
            console.log("https://w.soundcloud.com/player/?url=" + selectedSong.uri + widgetAttrs)
            vm.scope.$emit('tackSelectedEmitEvent', vm.selectedWidgetUrl);
            vm.panelFoldSelector = true;
            notifier.clickedSongnotify(selectedSong);
        } // sets selected song by user click on a song item from list, also sets a defualt photo if no artwork exists
        function onClickNextBtn() {
            var self = this;
            console.log(vm.searchResult)
            console.log("onClickNextBtn() running...")
            SC.get(nextPage, function (tracks) {
                setResults(tracks);
            })
        }

        function changeView() {
            console.log(this.panelFoldSelector)
            console.log("changeView running...")
            songHistoryFactory.setListViewSelector()
            vm.listViewSelector = songHistoryFactory.getListViewSelector();
            console.log("listviewselector= " + vm.listViewSelector)

        }
    }
})(angular);