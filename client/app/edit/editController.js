angular.module('noteApp.edit', ['angularTrix', 'ngSanitize'])
  .controller('EditController', ['$scope', '$rootScope', '$location', 'NoteAction', function ($scope, $rootScope, $location, NoteAction) {

    if (NoteAction.getNoteToEdit() === undefined) {
      $location.path('/notes');
    } else {
      $scope.titleText = NoteAction.getNoteToEdit().title;
      $scope.noteText = NoteAction.getNoteToEdit().note;
      $scope.dateText = NoteAction.getNoteToEdit().date;
    }

    $scope.saveNote = function(title, note) {
      console.log('calling saveNote');
      var currentTime = Date.now().toString();
      console.log(currentTime);
      NoteAction.removeOne(NoteAction.getNoteToEdit()).then(function(resp) {
          NoteAction.addOne({
            title: title,
            note: note,
            date: currentTime
          }).then(function(resp) {
            console.log('Updated the database:', resp);
            $location.path('/notes');
          }).catch(function(err) {
            console.log('Cannot add new note during save:', err);
          });
      }).catch(function(err) {
        console.log('Cannot delete old note during save:', err);
      });
    };

    $scope.clearButton = function(element) {
      if (element === 'titleText') {
        $scope.titleText = '';
      } else {
        $scope.noteText = '';
      }
    };

  }]);