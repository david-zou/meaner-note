angular.module('noteApp.services', [])
  .factory('NoteAction', function ($http) {

    var noteToEdit;

    var setNoteToEdit = function(note) {
      noteToEdit = note;
    };

    var getNoteToEdit = function() {
      return noteToEdit;
    };

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

    var removeOne = function(note) {
      console.log('calling removeOne with:', note);
      return $http({
        method: 'PUT',
        url: '/notes/delete',
        data: note
      }).then(function(resp) {
        console.log('delete response:', resp);
        return resp;
      }).catch(function(err) {
        console.error(err);
      });
    };

    var removeOne = function(note) {
      console.log('calling removeOne with:', note);
      return $http({
        method: 'PUT',
        url: '/notes/delete',
        data: note
      }).then(function(resp) {
        console.log('delete response:', resp);
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

    // var editOne = function(note) {
    //   console.log('editOne:', note);
    //   return $http({
    //     method: 'PUT',
    //     url: '/edit/put',
    //     data: note
    //   }).then(function(resp) {
    //     return resp.data;
    //   }).catch(function(err) {
    //     console.error(err);
    //   });
    // };

    return {
      getNoteToEdit: getNoteToEdit,
      setNoteToEdit: setNoteToEdit,
      addOne: addOne,
      getAll: getAll,
      removeOne: removeOne
    };

  });