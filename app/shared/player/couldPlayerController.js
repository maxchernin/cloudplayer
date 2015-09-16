(function (angular) {
    angular.module('cpControllers').controller('cloudPlayerController', ['$scope', cloudPlayerController]);

    function cloudPlayerController($scope) {
        var vm = this;
        vm.scope = $scope;
        vm.trackSelected = false;
        console.log(vm.scope.$parent.mainPageCtrl.selectedWidgetUrl)
        vm.scope.$on('tackSelectedBroadcastEvent',  function( event, data ){ //listens to searchpanel emit event, and broadcasts to cloudplayer controller that listens to the new event
        vm.trackSelected = true;
         vm.selectedWidgetUrl = data;
        });
    }
})(angular);