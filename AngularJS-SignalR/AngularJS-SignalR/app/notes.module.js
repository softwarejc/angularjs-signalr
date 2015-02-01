(function () {
    'use strict';

    var notesModule = angular.module('notesModule', [
        // Angular modules 
        'ngAnimate',
        'ngResource',
        'ngCookies',

        // Custom modules 

        // 3rd Party Modules
        'ui.router',
        'ui.bootstrap'
    ]);

    notesModule.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

        // For any unmatched URL redirect to main URL
        $urlRouterProvider.otherwise("/");

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $stateProvider

             .state('initial', {
                 url: "/",
                 views: {
                     'main': {
                         templateUrl: "app/notes/notes.view.html",
                         controller: "notesController as vm"
                     }
                 },
             })

        ;
    });

})();