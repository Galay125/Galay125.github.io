'use strict';


function listPtsController($scope, $modal, $http, PersonalTrainer, AppUser, ClientesOfPersonalTrainer)  {

  $scope.opt = {
    'language': {
      "processing":   "A processar...",
      "lengthMenu":   "Mostrar _MENU_ registos",
      "zeroRecords":  "Não foram encontrados resultados",
      "info":         "A mostrar de _START_ até _END_ de _TOTAL_ registos",
      "infoEmpty":    "A mostrar de 0 até 0 de 0 registos",
      "infoFiltered": "(filtrado de _MAX_ registos no total)",
      "infoPostFix":  "",
      "search":       "Procurar:",
      "url":          "",
      "paginate": {
        "first":    "Primeiro",
        "previous": "Anterior",
        "next":     "Seguinte",
        "last":     "Último"
      }
    }
  }

  PersonalTrainer.query(function (data) {
    $scope.pts = []
    var i = 0;
    function next(){
      if(i < data.length){
        var pt = {};
        if (data[i].user) {
          pt.speciality = data[i].speciality;
          pt.price=data[i].price;
          pt.user = data[i].user;
          AppUser.show({'id':data[i].user}, function (appUser) {
            pt.name = appUser.name;
            pt.birthday = appUser.birthday.substring(0,10);
            pt.rating = 3;
            pt.country = appUser.country;
            //tratar a cena dos planos de treino e nutrição
            ClientesOfPersonalTrainer.query({'id':data[i].id}, function (clients) {
              pt.students = clients.length;
              $scope.pts.push(pt);
              i++;
              next();
            });
          });
        }
      }
    }
    next();
  });


  $scope.openPT = function (size, pos) {

   var modalInstance = $modal.open({
    templateUrl: 'myModalContent.html',
    controller: 'ModalInstanceCtrl',
    size: size,
    resolve: {
      pt: function () {
        return $scope.pts[pos];
      }
    }
  });
 }

  /*$scope.groups = [];
  $scope.loadGroups = function () {
    return $scope.groups.length ? null : $http.get('data/groups.json').success(function (data) {
      $scope.groups = data;
    });
  };

  $scope.showGroup = function (user) {
    if (user.group && $scope.groups.length) {
      var selected = $filter('filter')($scope.groups, {
        id: user.group
      });
      return selected.length ? selected[0].text : 'Not set';
    } else {
      return user.groupName || 'Not set';
    }
  };

  $scope.showStatus = function (user) {
    var selected = [];
    if (user.status) {
      selected = $filter('filter')($scope.statuses, {
        value: user.status
      });
    }
    return selected.length ? selected[0].text : 'Not set';
  };


  // filter users to show
  $scope.filterUser = function (user) {
    return user.isDeleted !== true;
  };

  */

}

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
function ModalInstanceCtrl($scope, $modalInstance, pt) {
  $scope.pt = pt;
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.calculateAge = function calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}

angular
.module('urbanApp')
.controller('listPtsController', ['$scope', '$modal', '$http','PersonalTrainer','AppUser', 'ClientesOfPersonalTrainer', listPtsController])
.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'pt', ModalInstanceCtrl]);