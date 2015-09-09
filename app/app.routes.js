(function (angular) {
    angular.module('cpRoutes').config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider
        .otherwise('/')
        $stateProvider
        .state('main', {
            url: "/",
                templateUrl: 'app/components/mainPage/mainPage.html',
                controller: 'mainPageController',
                controllerAs: 'mainPageCtrl'
            });
//        $locationProvider.html5Mode(true);  //remove # from address bar
    })
})(angular);
