angular.module('noteApp.display', [])
  .controller('DisplayController', ['$scope', function ($scope, NoteAction) {

    $scope.mockdata1 = {
      title: 'Some note 1',
      note: 'This is a test note!'
    };
    $scope.mockdata2 = {
      title: 'Some note 2',
      note: 'Hello world!'
    };
    $scope.mockdata3 = {
      title: 'Some note 3',
      note: 'HOOBLAH'
    };

    $scope.noteList = [$scope.mockdata1, $scope.mockdata2, $scope.mockdata3];
    $scope.example = 'This example should be displayed.';


  }]);