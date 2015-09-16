(function (angular) {
    angular.module('cpServices')
        .factory('songHistoryFactory', ['$cookies', songHistoryFactory]);

    function songHistoryFactory($cookies) {
        var recents = $cookies.getObject('recentSearches') || [];
        var listViewSelector = $cookies.getObject('viewPicker');
        var historyLimit = 5;
        var getDatetime = new Date();
        console.log("view selector from serever " + listViewSelector)
        if (listViewSelector == undefined) {
            listViewSelector = true;
        }
        return {
            getRecentSongs: getRecentSongs,
            addSongToRecents: addSongToRecents,
            setListViewSelector: setListViewSelector,
            getListViewSelector: getListViewSelector
        }

        function getRecentSongs() {
            return recents;
        }

        function addSongToRecents(destSong, destUrl) { //        adds the recent song recived from the controller (userinput ng model) to the array, then saves the array as the value stored inside the recentSearches cookie
            var savedObject = {
                name: destSong,
                date: getDatetime.getDate() + "/" + (getDatetime.getMonth() + 1) + "/" + getDatetime.getFullYear(),
                time: getDatetime.getUTCHours() + 3 + ":" + getDatetime.getUTCMinutes(),
                url: destUrl
            }
            if (recents.length >= historyLimit) {
                recents.pop();
            }
            recents.unshift(savedObject);
            console.log(recents)
            $cookies.putObject('recentSearches', recents);
        }

        function setListViewSelector(destSelector) { //  changes the listViewSelector param then saves it as cookie value
            listViewSelector = !listViewSelector;
            $cookies.putObject('viewPicker', listViewSelector)
        }

        function getListViewSelector() {
            return listViewSelector;
        }
    }
})(angular);