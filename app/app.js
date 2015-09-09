(function (angular) {
    "use strict";
//    decleration of all modules is made here for convinience, then all of them injected into main module Musicanto
    angular.module('cpControllers', []);
    angular.module('cpDirectives',[]);
    angular.module('cpServices',['ngResource', 'ngCookies']);
    angular.module('cpRoutes', ['ui.router'])
    angular.module('cloudplayer', ['cpRoutes', 'cpControllers', 'cpDirectives', 'cpServices'])
})(angular);