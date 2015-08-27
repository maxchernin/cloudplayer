(function (angular) {
    angular.module('Services')
        .factory('songHistoryFactory', ['$http', '$cookies', songHistoryFactory]);

    function songHistoryFactory($http /*for later use */, $cookies) {
           var recents = $cookies.getObject('recentSearches') || [];
        var listViewSelector = $cookies.getObject('viewPicker')
        if (listViewSelector == undefined){
            listViewSelector = true;
        }
        console.log("from serever " + listViewSelector)
        var historyLimit = 5;
        return {
          getRecentSongs:getRecentSongs,
            addSongToRecents:addSongToRecents,
            setListViewSelector:setListViewSelector,
            getListViewSelector:getListViewSelector
        }
        function getRecentSongs (){
            return recents;
        }
//        adds the recent song recived from the controller (userinput ng model) to the array, then saves the array as the value stored inside the recentSearches cookie
        function addSongToRecents(destSong){
        if (recents.length >= historyLimit){
                recents.pop();
            }
            recents.unshift(destSong);
            $cookies.putObject('recentSearches', recents);
        }
//        changes the listViewSelector param then saves it as cookie value
        function setListViewSelector(destSelector){
            listViewSelector = !listViewSelector;
            $cookies.putObject('viewPicker', listViewSelector)
        }
        function getListViewSelector(){
            return listViewSelector;
        }
    }
})(angular);
