'use strict';

describe('Service: EntityTypesAppearanceService', function () {

  // load the service's module
  beforeEach(module('angularfireApp'));

  // instantiate service
  var EntityTypesAppearanceService;
  beforeEach(inject(function (_EntityTypesAppearanceService_) {
    EntityTypesAppearanceService = _EntityTypesAppearanceService_;
  }));

  it('should do something', function () {
    expect(!!EntityTypesAppearanceService).toBe(true);
  });

});
