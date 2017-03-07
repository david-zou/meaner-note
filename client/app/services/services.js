angular.module('noteApp.services', [])
  .factory('NoteAction', function ($http) {

    var addOne = function(note) {
      return $http({
        method: 'POST',
        url: '/notes/post',
        data: note
      }).then(function(resp) {
        return resp;
      }).catch(function(err) {
        console.error(err);
      });
    };

    var getAll = function() {
      return $http({
        method: 'GET',
        url: '/notes/get'
      }).then(function(resp) {
        return resp;
      }).catch(function(err) {
        console.error(err);
      })
    };

    var editOne = function(note) {
      return $http({
        method: 'PUT',
        url: '/edit/put',
        data: note
      }).then(function(resp) {
        return resp.data;
      }).catch(function(err) {
        console.error(err);
      })
    }

    return {
      addOne: addOne,
      getAll: getAll,
      editOne: editOne
    }

  });