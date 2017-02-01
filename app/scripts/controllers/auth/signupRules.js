'use strict';

function signupWizard($scope, SweetAlert, COLORS, AuthService) {
  /*  $scope.validationOpt = {
   rules: {
   emailfield: {
   required: true,
   email: true,
   minlength: 3
   },
   username: {
   required: true,
   minlength: 3
   },
   passwordfield: {
   required: true,
   minlength: 6
   },
   cpasswordfield: {
   required: true,
   minlength: 6,
   equalTo: '#passwordfield'
   },
   descricao: {
   required: true
   },
   repositorio: {
   required: true
   },
   nome_pessoal: {
   required: true
   },
   data_nascimento: {
   required: true
   }
   }
   };*/
  $scope.alergies = {
    "alergias": []
  };


  $scope.addAlergie = function (alergie) {

    var index = ($scope.alergies.alergias.indexOf(alergie));
    if (index == -1) {

      $scope.alergies.alergias.push(alergie);
    }
  }


  $scope.removeAlergie = function (alergie) {

    var index = ($scope.alergies.alergias.indexOf(alergie));
    if (index > -1) {
      $scope.alergies.alergias.splice(index, 1);
    }
  }

$scope.dislikedFoods = {
    "comidas": []
  };


  $scope.addDislikedFood = function (dislikedFood) {

    var index = ($scope.dislikedFoods.comidas.indexOf(dislikedFood));
    if (index == -1) {

      $scope.dislikedFoods.comidas.push(dislikedFood);
    }
  }


  $scope.removeDislikedFood = function (dislikedFood) {

    var index = ($scope.dislikedFoods.comidas.indexOf(dislikedFood));
    if (index > -1) {
      $scope.dislikedFoods.comidas.splice(index, 1);
    }
  }
$scope.phisicalProblems = {
    "problemasFisicos": []
  };


  $scope.addPhisicalProblem = function (phisicalProblem) {

    var index = ($scope.phisicalProblems.problemasFisicos.indexOf(phisicalProblem));
    if (index == -1) {

     $scope.phisicalProblems.problemasFisicos.push(phisicalProblem);
    }
  }


  $scope.removePhisicalProblem = function (phisicalProblem) {

    var index = ($scope.phisicalProblems.problemasFisicos.indexOf(phisicalProblem));
    if (index > -1) {
      $scope.phisicalProblems.problemasFisicos.splice(index, 1);
    }
  }


  $scope.dataSent = false;

  $scope.wizardOpt = {
    tabClass: '',
    'nextSelector': '.button-next',
    'previousSelector': '.button-previous',
    'firstSelector': '.button-first',
    'lastSelector': '.button-last',

    onNext: function (tab, navigation, index) {
      var $valid = angular.element('#commentForm').valid(),
        $validator;
      if (!$valid) {
        $validator.focusInvalid();
        return false;
      }
      else {


        if (index == 3) {

          SweetAlert.swal({
              title: 'Registo quase completo!',
              text: 'Deseja redefinir alguma informação?',
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: COLORS.danger,
              confirmButtonText: 'Finalizar o registo',
              closeOnConfirm: false,
            },
            function () {

               $scope.userSignUp.alergies = $scope.alergies;
               $scope.userSignUp.dislikedFood = $scope.dislikedFoods;
               $scope.userSignUp.phisicalProblems = $scope.phisicalProblems;
              var res = AuthService.register($scope.userSignUp.username, $scope.userSignUp.email, $scope.userSignUp.password, $scope.userSignUp);
              if (res.success != false) {
                $scope.dataSent = true;
                //CrudService.newRepository(res.id, $scope.userSignUp.repository);

                swal('Registo concluido!', '', 'success');

              }
              else {
                swal('Erro!', 'Dados de autenticação já utilizados', 'warning');
              }


            });
        }
      }
    },
    onTabClick: function (tab, navigation, index) {
      return false;

    }

  };
}

angular
  .module('urbanApp')
  .controller('signupWizard', ['$scope', 'SweetAlert', 'COLORS', 'AuthService',  signupWizard]);