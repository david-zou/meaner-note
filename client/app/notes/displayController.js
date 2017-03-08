var displayModule = angular.module('noteApp.display', []);

displayModule.controller('DisplayController', ['$scope', '$rootScope', '$location', '$timeout', 'NoteAction', function ($scope, $rootScope, $location, $timeout, NoteAction) {

    $scope.noteList = [];
    $scope.currentNote = '';
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    var titleFieldCleared = false;
    var noteFieldCleared = false;

    $scope.totalPages = function() {
      return Math.ceil($scope.noteList.length/$scope.pageSize);
    };

    $scope.nextPage = function() {
      if ($scope.currentPage < $scope.totalPages()) {
        $scope.currentPage++;
      }
    };

    $scope.prevPage = function() {
      if ($scope.currentPage > 0) {
        $scope.currentPage--;
      }
    };

    $scope.grabNotes = function(cb) {
      NoteAction.getAll().then(function(resp) {
        if (resp.data.length === 0) {
          $scope.noteList = [];
          $scope.currentNote = 'No Notes Yet!';
        } else {
          $scope.noteList = resp.data;
        }
        if (cb) {
          cb($scope.noteList);
        }
      });
    };

    $scope.grabNotes(function(list) {
      if (list.length === 0) {
        $scope.currentNote = 'No Notes Yet!';
      } else {
        $scope.currentNote = list[0].note;
      }
    });
    $scope.titleText = "Enter your title here!";
    $scope.noteText = "Enter your note here!";

    $scope.selectNote = function(index) {
      $scope.currentNote = $scope.noteList[index].note;
    };

    $scope.submitNote = function(title, note) {
      var currentTime = Date.now().toString();
      NoteAction.addOne({
        title: title,
        note: note,
        date: currentTime
      }).then(function(resp) {
        $scope.grabNotes(function() {
          if ($scope.noteList.length === 1) {
            $scope.currentNote = $scope.noteList[0].note;
          }
        });
      }).catch(function(err) {
        console.log('Cannot submit note:', err);
      });
    };

    $scope.editNote = function(index) {
      console.log('editNote called');
      NoteAction.setNoteToEdit($scope.noteList[index]);
      $location.path('/edit');
    };

    $scope.deleteNote = function(index) {
      NoteAction.removeOne($scope.noteList[index], function() {
        $scope.grabNotes(function() {
          if (index === 0 && $scope.noteList.length > 0) {
            $scope.currentNote = $scope.noteList[0].note;
          }
        });
      });
    };

    $scope.clearField = function(element) {
      if (element === 'titleText') {
        if (!titleFieldCleared) {
          $scope.titleText = '';
          titleFieldCleared = true;
        }
      } else {
        if (!noteFieldCleared) {
          $scope.noteText = '';
          noteFieldCleared = true;
        }
      }
    };

    $scope.clearButton = function(element) {
      if (element === 'titleText') {
        $scope.titleText = '';
      } else {
        $scope.noteText = '';
      }
    };

  }]);

displayModule.filter('startFrom', function() {
  return function(input, start) {
      start = +start; //parse to int
      return input.slice(start);
  };
});