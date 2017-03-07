var displayModule = angular.module('noteApp.display', []);

displayModule.controller('DisplayController', ['$scope', '$location', 'NoteAction', function ($scope, $location, NoteAction) {

    $scope.mockdata1 = {
      title: 'Some note 1',
      note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.',
      date: '1'
    };
    $scope.mockdata2 = {
      title: 'Some note 2',
      note: 'Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh.',
      date: '2'
    };
    $scope.mockdata3 = {
      title: 'Some note 3',
      note: 'HOOBLAH',
      date: '3'
    };

    $scope.noteList = [];
    $scope.currentNote = {};
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
        console.log('grabNotes successful:', resp);
        if (resp.data.length === 0) {
          $scope.noteList = [$scope.mockdata1, $scope.mockdata2, $scope.mockdata3];
        } else {
          $scope.noteList = resp.data;
        }
        if (cb) {
          cb($scope.noteList);
        }
      });
    };

    $scope.grabNotes(function(list) {
      $scope.currentNote = list[0].note;
    });
    $scope.example = 'This example should be displayed.';
    $scope.titleText = "Enter your title here!";
    $scope.noteText = "Enter your note here!";

    $scope.selectNote = function(index) {
      $scope.currentNote = $scope.noteList[index].note;
    };

    $scope.submitNote = function(title, note) {
      NoteAction.addOne({
        title: title,
        note: note
      }).then(function(resp) {
        console.log('submitNote successful:', resp);
        $scope.grabNotes();
      }).catch(function(err) {
        console.log('Cannot submit note:', err);
      });
    };

    $scope.editNote = function(index) {
      NoteAction.setNoteToEdit($scope.noteList[index]);
      $location.path('/edit');
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

  }]);

displayModule.filter('startFrom', function() {
  return function(input, start) {
      start = +start; //parse to int
      return input.slice(start);
  };
});