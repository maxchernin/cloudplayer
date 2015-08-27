(function (angular) {
    angular.module('Routes').config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
        .otherwise('/')
        $stateProvider
        .state('main', {
            url: "/",
                templateUrl: 'app/components/mainPage/mainPage.html',
                controller: 'mainPageController',
                controllerAs: 'mainPageCtrl'
            })
    })
})(angular);
//max