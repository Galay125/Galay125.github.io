'use strict';

function sessionCtrl($scope, $state, AuthService, SweetAlert) {
  $scope.signin = function () {
    $state.go('auth.signin');
  };


  $scope.logout = function () {
    AuthService.logout();
    $state.go('auth.signin');
  }


  $scope.submit = function (email, password) {
    if (AuthService.login(email, password)) {
      SweetAlert.swal({
        title: "Sucesso",
        timer: 1000,
        type: "success",
        showConfirmButton: false,
      }, function () {


        swal.close();
       $state.go('app.dashboard');
      });
    }
    else {
      SweetAlert.swal({
        title: "Erro",
        text: "Credenciais inválidas",
        timer: 1000,
        type: "warning",
        showConfirmButton: false,
      }, function () {
        swal.close();
      });
    }
    ;
  };
}


angular
  .module('urbanApp')
  .controller('sessionCtrl', ['$scope', '$state', 'AuthService', 'SweetAlert', sessionCtrl]);


