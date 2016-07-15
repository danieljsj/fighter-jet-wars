'use strict';

describe('Controller: SingleunitCtrl', function () {

  // load the controller's module
  beforeEach(module('angularfireApp'));

  var SingleunitCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SingleunitCtrl = $controller('SingleunitCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
