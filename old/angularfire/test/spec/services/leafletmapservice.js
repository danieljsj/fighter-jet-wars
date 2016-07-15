'use strict';

describe('Service: LeafletMapService', function () {

  // load the service's module
  beforeEach(module('angularfireApp'));

  // instantiate service
  var LeafletMapService;
  beforeEach(inject(function (_LeafletMapService_) {
    LeafletMapService = _LeafletMapService_;
  }));

  it('should do something', function () {
    expect(!!LeafletMapService).toBe(true);
  });

});
