(function () {
    'use strict';

    angular
        .module('notesModule')
        .controller('notesController', ['notesService', '$cookies', '$scope', notesController]);

    notesController.$inject = ['notesService'];
    notesController.$inject = ['$cookies'];
    notesController.$inject = ['$scope'];

    function notesController(notesService, $cookies, $scope) {
        var self = this;

        //// ---------------- PUBLIC ----------------
        //// PUBLIC fields
        // true after connected to signalR
        self.connected = false;

        //// PUBLIC Methods
        self.activate = _activate;

        //// ---------------- CODE TO RUN -----------
        self.activate();

        //// ---------------- PRIVATE ---------------
        //// PRIVATE fields

        //// PRIVATE Functions - Public Methods Implementation	
        function _activate() {
            notesService.initialize();

            $scope.$on(signalR.onConnected, function () {
                connectedToSignalR();
            });


        }

        //// PRIVATE Functions
        function connectedToSignalR() {
            // this needs to be executed within the apply, otherwise angular cannot update bindings
            $scope.$apply(function () {
                self.connected = true;

                 
            });

        }
    }
})();
