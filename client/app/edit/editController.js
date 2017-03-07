angular.module('noteApp.edit', [])
  .controller('EditController', ['$scope', '$location', 'NoteAction', function ($scope, $location, NoteAction) {

    $scope.titleText = NoteAction.getNoteToEdit().title;
    $scope.noteText = NoteAction.getNoteToEdit().note;
    
  }]);