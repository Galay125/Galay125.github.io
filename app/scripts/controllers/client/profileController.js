'use strict';

function profileController($scope, $stateParams, ModalService, Client, AppUser, User, PersonalTrainer,  $window, SweetAlert, COLORS) {


  $scope.client = {};

  $scope.client = {
    user: {},
    appuser: [],
  }

  var token = $window.sessionStorage.token;
  var client = $window.sessionStorage.clientId;

  $scope.editAlergies = function () {
    if ($scope.boolEditAlergies) $scope.boolEditAlergies = false;
    else $scope.boolEditAlergies = true;
  }


  if ($stateParams.id) {
    $scope.isUserProfile = false;

  }
  else  $scope.isUserProfile = true;


  //mudar isto !

  $scope.addAlergie = function (alergia, $event) {
      $event.preventDefault();
      $scope.client.clientPr.alergies.push(alergia);
      Client.update({'id': client}, $scope.client.clientPr);
  }


  $scope.removeAlergie = function (alergie) {

    var index = $scope.client.clientPr.alergies.indexOf(alergie);
    if (index > -1) {
      $scope.client.clientPr.alergies.splice(index, 1);
    }
    Client.update({'id': client},$scope.client.clientPr);

  }

  $scope.client.clientPr = Client.show({'id': client}, function (data) {
    delete data['$promise'];
    delete data['$resolved'];
  });

  AppUser.query({'user': token}, function (data) {
    $scope.client.appuser = data[0];
  });
 
  User.show({'id': token}, function (data) {
    delete data['$promise'];
    delete data['$resolved'];
    $scope.client.user = data;
  });

  //console.log($scope.client);


  

  $scope.editProfile = function (client, elem) {
    elem.preventDefault();
    ModalService.showModal({

      templateUrl: "modal.html",
      controller: function ($scope, $element, title, close) {
        $scope.new = angular.copy(client);


        $scope.cancel = function () {
          $element.modal('hide');

          return;
        };
        $scope.close = function () {
          $element.modal('hide');
          close({
              client: $scope.new
            },
            500
          );
        };
      },

      inputs: {
        title: "Editar dados"
      }


    }).then(function (modal) {
      modal.element.modal();


      modal.close.then(function (result) {
        SweetAlert.swal({
          title: "Sucesso",
          text: "Dados atualizados",
          timer: 500,
          type: "success",
          showConfirmButton: false,
        }, function () {
          swal.close();
          $window.location.reload();
        });
          
          User.update(result["client"].user, {'id': result["client"].user["id"]});
          AppUser.update(result["client"].appuser, {'id': result["client"].appuser["id"]});
          Client.update(result["client"].clientPr, {'id': result["client"].clientPr["id"]});
      });
    });

  }


};


angular.module('urbanApp').controller('profileController', ['$scope', '$stateParams', 'ModalService', 'Client', 'AppUser', 'User', 'PersonalTrainer', '$window', 'SweetAlert', 'COLORS', profileController])
