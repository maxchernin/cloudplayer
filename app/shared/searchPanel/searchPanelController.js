(function (angular) {
    angular.module('cpControllers').controller('searchPanelController', ['$scope', '$location', '$sce', 'songHistoryFactory', 'notifier', searchPanelController])

    function searchPanelController($scope, $location, $sce, songHistoryFactory, notifier) {
        console.log("search panel directive controller");
        var vm = this;
        vm.scope = $scope;
        var nextPage = ''
        var pageSize = 9;
        vm.userInput = "ACDC"; // just for initial loading
        vm.listViewSelector;
        vm.panelFoldSelector = false;
        vm.isTrackSelected = false;
        vm.searchResult;
        vm.selectedWidgetUrl;
        vm.defualtPicPath = "assets/images/soundcloud.png";
        vm.getDatetime = new Date();
        vm.getSongs = getSongs;
        vm.setResults = setResults;
        vm.selectSong = selectSong;
        vm.onClickNextBtn = onClickNextBtn;
        vm.changeView = changeView;

        function getSongs() { //        this method retrives all songs with string taken form input field plus saves the search
            console.log("getSongs() running...")
            console.log("search added: " + vm.userInput)
            var self = this
            SC.get('/tracks', {
                q: self.userInput,
                'limit': pageSize,
                'linked_partitioning': 1,
            }, function (tracks) {
                vm.setResults(tracks)
            });
            songHistoryFactory.addSongToRecents(vm.userInput, vm.getDatetime, vm.selectedWidgetUrl)
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
            vm.isTrackSelected = true;
            vm.selectedWidgetUrl = $sce.trustAsResourceUrl("https://w.soundcloud.com/player/?url=" + selectedSong.uri + "&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true");
            console.log("https://w.soundcloud.com/player/?url=" + selectedSong.uri + "&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true")
            console.log("isSelected? " + vm.isSelected)
//           vm.scope.$parent.mainPageCtrl.selectedWidgetUrl = vm.selectedWidgetUrl;
            vm.scope.$emit('trackUrlSelectedEvent', vm.selectedWidgetUrl, true);
            vm.panelFoldSelector = true;
            notifier.clickedSongnotify(selectedSong);
        } // sets selected song by user click on a song item from list, also sets a defualt photo if no artwork exists
        function onClickNextBtn() {
            var self = this;
            console.log(vm.searchResult)
            console.log(vm.selectedWidgetUrl)
            console.log("onClickNextBtn() running...")
            SC.get(nextPage, function (tracks) {
                vm.setResults(tracks);
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
