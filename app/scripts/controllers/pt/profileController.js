'use strict';

function profileController($scope, $window, $http, PersonalTrainerDetails, Client, RepsOfPersonalTrainer, PlansOfRepo) {

  //var token = $window.sessionStorage.clientId;


  /*$scope.pt = {
    "name": "Sérgio Simões",
    "country": "Portugal",
    "birthday": new Date(1993, 3, 17),
    "train_plans": [
      {
        "name": "Plano de Treino X",
        "alunos": 15
      },
      {
        "name": "Plano de Treino Y",
        "alunos": 5
      }
    ],
    "nutrion_plans": [
      {
        "name": "Plano de Nutri X",
        "alunos": 15
      },
      {
        "name": "Plano de Nutri Y",
        "alunos": 5
      }
    ]
    ,
    "rating": 3,
    "alunos": 40,
    "especialidade": ["Musculação","Natação", "Cozinha"],
    "comments": [ 
      {
        "cliente": "Marocas",
        "imagem" : "images/avatar.jpg",
        "rate": 3,
        "date": "May 2015, 19:20",
        "comment":  "Qualquer coisa fixe !"
      },
      {
        "cliente": "Gestas",
        "imagem" : "images/avatar.jpg",
        "rate": 0,
        "date": "May 2015, 19:20",
        "comment":  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Frater et T. Sed ad bona praeterita redeamus.!"
      }
    ]
  }*/
  var clientID = $window.sessionStorage.clientId;

  $scope.pt = {};
  $scope.pt.train_plans = [];
  $scope.pt.nutrion_plans = [];

  Client.show({'id':clientID}, function (cliente){
    PersonalTrainerDetails.show({'id':cliente.personalTrainer}, function (data) {
      $scope.pt.speciality = data.speciality;
      $scope.pt.name = data.user.name;
      $scope.pt.birthday = data.user.birthday.substring(0,10);
      $scope.pt.rating = 3;
      $scope.pt.country = data.user.country;
      RepsOfPersonalTrainer.query({'id':cliente.personalTrainer}, function (reps) {
        var i = 0;
        function next(){
          if(i < reps.length){
            PlansOfRepo.query({'id':reps[i].id}, function (plans) {
              for(var x = 0; x < plans.length; x++)
                if(plans[x].type == "treino")
                  $scope.pt.train_plans.push(plans[x]);
                else
                  $scope.pt.nutrion_plans.push(plans[x]);
              i++;
              next();
            });
          }
        }
        next();
    });
    });
  });


};

function ModalDemoCtrl($scope, $modal, $log) {
  $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
}

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
function ModalInstanceCtrl($scope, $modalInstance, items) {
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}




angular
.module('urbanApp')
.controller('profileController', ['$scope', '$window', '$http', 'PersonalTrainerDetails', 'Client', 'RepsOfPersonalTrainer', 'PlansOfRepo', profileController])
.controller('ModalDemoCtrl', ['$scope', '$modal', '$log', ModalDemoCtrl])
.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items', ModalInstanceCtrl])