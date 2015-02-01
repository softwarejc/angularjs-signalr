(function () {
    'use strict';

    angular
        .module('notesModule')
        .service('notesService', ['$resource', '$rootScope', '$q', notesService]);

    notesService.$inject = ['$resource'];
    notesService.$inject = ['$rootScope'];
    notesService.$inject = ['$q'];
    
    function notesService($resource, $rootScope, $q) {

        //// privates
        var _hubConnection = $.hubConnection();
        var _notesHubProxy = undefined;

        //// Service methods implementation

        function _initialize() {

            // Hub Proxy (allows to make calls and register callbacks handlers)
            _notesHubProxy = _hubConnection.createHubProxy(notesSignalR.hubName);

            // signalR callbacks handlers
            _notesHubProxy.on(notesSignalR.onNewNote, broadcastNewNote);
            _notesHubProxy.on(notesSignalR.onRemoveNote, broadcastRemoveNote);

            // connect
            _hubConnection.start()
                .done(connectedToSignalR)
                .fail(function () { console.error('Error connecting to signalR'); });
        }

        function broadcastNewNote(note) {
            console.debug(notesSignalR.onNewNote + " " + note.text);
            $rootScope.$broadcast(notesSignalR.onNewNote, { note: note });
        }

        function broadcastRemoveNote(noteId) {
            console.debug(notesSignalR.onRemoveNote + " " + noteId);
            $rootScope.$broadcast(notesSignalR.onRemoveNote, { noteId: noteId });
        }

        function connectedToSignalR() {
            console.debug('connected to signalR, connection ID =' + _hubConnection.id);
            $rootScope.$broadcast(signalR.onConnected, { connectionId: _hubConnection.id });
        }

        function _addNote(note) {
            _notesHubProxy.invoke(notesSignalR.addNote, note);
        }

        function _removeNote(noteId) {
            _notesHubProxy.invoke(notesSignalR.removeNote, noteId);
        }

        function _getAllNotesAsync() {

            var deferred = $q.defer();

            _notesHubProxy.invoke(notesSignalR.getAllNotes)
               .done(function (notes) {
                   deferred.resolve(notes);
               });

            return deferred.promise;
        }

        //// Service public methods
        var service = {};

        // SignalR hub
        service.notesHubProxy = _notesHubProxy;

        service.initialize = _initialize;
        service.addNote = _addNote;
        service.removeNote = _removeNote;
        service.getAllNotesAsync = _getAllNotesAsync;

        return service;

    }
})();
