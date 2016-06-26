'use strict';

describe('Service: EntitiesService', function () {

  // load the service's module
  beforeEach(module('angularfireApp'));

  // instantiate service
  var EntitiesService;
  beforeEach(inject(function (_EntitiesService_) {
    EntitiesService = _EntitiesService_;
  }));

  it('should do something', function () {
    expect(!!EntitiesService).toBe(true);
  });

});
