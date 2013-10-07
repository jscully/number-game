'use strict';

var app = angular.module('countdown-app', ['ngRoute', 'ngAnimate'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  })
}]);
