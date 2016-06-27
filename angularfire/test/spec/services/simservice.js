'use strict';

describe('Service: SimService', function () {

  // load the service's module
  beforeEach(module('angularfireApp'));

  // instantiate service
  var SimService;
  beforeEach(inject(function (_SimService_) {
    SimService = _SimService_;
  }));

  it('should do something', function () {
    expect(!!SimService).toBe(true);
  });

});
