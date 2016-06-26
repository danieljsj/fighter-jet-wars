'use strict';

describe('Service: KnownEntitiesService', function () {

  // load the service's module
  beforeEach(module('angularfireApp'));

  // instantiate service
  var KnownEntitiesService;
  beforeEach(inject(function (_KnownEntitiesService_) {
    KnownEntitiesService = _KnownEntitiesService_;
  }));

  it('should do something', function () {
    expect(!!KnownEntitiesService).toBe(true);
  });

});
