angular.module('firebase.config', [])
  .constant('FBURL', 'https://fighter-jets-oldfire.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password'])

  .constant('loginRedirectPath', '/login');
