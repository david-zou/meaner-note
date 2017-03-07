angular.module('noteApp', ['noteApp.display', 'noteApp.edit', 'noteApp.services', 'ngRoute'])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/notes', {
        templateUrl: 'app/notes/notes.html',
        // controller: 'DisplayController'
      })
      .when('/edit', {
        templateUrl: 'app/edit/edit.html',
        controller: 'EditController'
      })
      .otherwise({
        redirectTo: '/notes'
      });
    });

