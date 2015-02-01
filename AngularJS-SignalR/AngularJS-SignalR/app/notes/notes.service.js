(function () {
    'use strict';

    angular
        .module('notesModule')
        .service('notesService', ['$resource', '$rootScope', notesService]);

    notesService.$inject = ['$resource'];
    notesService.$inject = ['$rootScope'];

    function notesService($resource, $rootScope) {

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
            console.debug(notesSignalR.onNewNote);
            $rootScope.$broadcast(notesSignalR.onNewNote, { note: note });
        }

        function broadcastRemoveNote(note) {
            console.debug(notesSignalR.onRemoveNote);
            $rootScope.$broadcast(notesSignalR.onRemoveNote, { note: note });
        }

        function connectedToSignalR() {
            console.debug('connected to signalR, connection ID =' + _hubConnection.id);
            $rootScope.$broadcast(signalR.onConnected);
        }

        function _addNote(note) {
            _notesHubProxy.invoke(notesSignalR.addNote, note);
        }

        function _removeNote(noteId) {
            _notesHubProxy.invoke(notesSignalR.removeNote, noteId);
        }

        //// Service public methods
        var service = {};

        // SignalR hub
        service.notesHubProxy = _notesHubProxy;

        service.initialize = _initialize;
        service.addNote = _addNote;
        service.removeNote = _removeNote;

        return service;

    }
})();
