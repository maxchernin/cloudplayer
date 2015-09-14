(function (angular) {
    angular.module('cpControllers').controller('cloudPlayerController', ['$scope', '$location', '$sce', 'songHistoryFactory', 'notifier', cloudPlayerController]);

    function cloudPlayerController($scope, $location, $sce, songHistoryFactory, notifier) {
        var vm = this;
        vm.scope = $scope;
        console.log(vm.scope.$parent.mainPageCtrl.selectedWidgetUrl)
        vm.scope.$on('trackUrlBroadcastEvent',  function( event, data ){
         vm.selectedWidgetUrl = data;
        });
    }
})(angular);