angular.module('firebase.config', [])
  .constant('FBURL', 'https://fighter-jets.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password'])

  .constant('loginRedirectPath', '/login');
