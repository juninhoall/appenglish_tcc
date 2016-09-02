angular.module('newmod', ['firebase'])
// factory para autenticar
.factory("Auth", function($firebaseAuth){
  var endPoint = "https://authioniccatolica.firebaseio.com/users";

  var usersRef = new Firebase(endPoint);
  // reto
  return $firebaseAuth(usersRef);

})
.controller('appCtrl2', function($scope, Auth){
  Auth.$onAuth(function(authData) {
    if (authData === null) {
      console.log('usuario nao autenticado');
    }else{
        console.log('foi');
        console.log(authData);
    }
    $scope.authData = authData;
  });

  $scope.login = function(authMethod){
    Auth.$authWithAuthRedirect(authMethod).then(function(authData){

    }).cath(function(error){
      if(error.code === 'TRANSPORTE_UNIVAIABLE'){
        Auth.$authWithAuthPopup(authMethod).then(function(authData){})

      }else {
        console.log('capturar erro.: '+ error);
      }
    })
  }
});
