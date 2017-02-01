'use strict';
function showTrainPlanExerciseController($scope, $filter, $http, editableOptions, editableThemes) {
  editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3';

$scope.exercicios = [
    {
      id: 1,
      nome: 'Flexões',
      velocidade: 'Lento',
      tempoDescanso: 2,
      descricao: 'É para fazer direito',
      repeticoes: [{ repeticao: 2 , serie: 20} , { repeticao:3, serie:50}] ,
      file:  'http://www.freeiconspng.com/uploads/exercise-icon-11.png'
        },
    {
      id: 2,
      nome: 'Abdominais desarefecimento',
      velocidade: 'Rápido',
      tempoDescanso: 3,
      descricao: 'É para fazer direito',
      repeticoes: [{ repeticao: 2 , serie: 20} , { repeticao:3, serie:50}] , 
      file:'http://www.freeiconspng.com/uploads/exercise-icon-11.png'
        },
    {
      id: 3,
      nome: 'Abdominais laterais',
      velocidade: 'Lento',
      tempoDescanso: 4,
      descricao: 'É para fazer direito',
      repeticoes: [{ repeticao: 2 , serie: 20} , { repeticao:3, serie:50}] , 
      file: 'https://image.freepik.com/free-icon/stick-man-variant-doing-push-ups-from-the-ground_318-47899.jpg' 
        },
  ];

 $scope.exerciciosEst = [
    {
      id: 3,
      nome: 'Alongamento X',
      tipo: 'Aquecimento',
      zonaMuscular: 'Peito',
      descricao: 'Objectivo essencial é ...',    
      file:  'http://www.freeiconspng.com/uploads/exercise-icon-11.png'
        },
    {
      id: 4,
      nome: 'Alongamento Y',
      tipo: 'Aquecimento',
      zonaMuscular: 'Pernas',
      descricao: 'Objectivo essencial é ...',  
      file:  'http://www.freeiconspng.com/uploads/exercise-icon-11.png'
        },
    {
      id: 5,
      nome: 'Alongamento Z',
      tipo: 'Finalização',
      zonaMuscular: 'Braços',
      descricao: 'Objectivo essencial é...',   
      file:  'http://www.freeiconspng.com/uploads/exercise-icon-11.png'
        },
  ];
$scope.showGroup = function (exercicio) {
    if (exercicio.repeticao && $scope.repeticoes.length) {
      var selected = $filter('filter')($scope.repeticoes, {
        id: exercicio.repeticao
      });
      return selected.length ? selected[0].text : 'Fodeu';
    } else {
      return exericio.repeticao || 'Fodeu';
    }
  };


}

  angular
  .module('urbanApp')
  .controller('showTrainPlanExerciseController', ['$scope', '$filter', '$http', 'editableOptions', 'editableThemes', showTrainPlanExerciseController]);