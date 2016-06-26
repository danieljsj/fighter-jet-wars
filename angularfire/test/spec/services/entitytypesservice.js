'use strict';

describe('Service: EntityTypesService', function () {

  // load the service's module
  beforeEach(module('angularfireApp'));

  // instantiate service
  var EntityTypesService;
  beforeEach(inject(function (_EntityTypesService_) {
    EntityTypesService = _EntityTypesService_;
  }));

  it('should do something', function () {
    expect(!!EntityTypesService).toBe(true);
  });

});
