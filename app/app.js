(function (angular) {
    "use strict";
//    decleration of all modules is made here for convinience, then all of them injected into main module Musicanto
    angular.module('Controllers', []);
    angular.module('Directives',[]);
    angular.module('Services',['ngResource', 'ngCookies']);
    angular.module('Routes', ['ui.router'])
    angular.module('cloudplayer', ['Routes', 'Controllers', 'Directives', 'Services'])
})(angular);