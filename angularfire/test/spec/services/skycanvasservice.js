'use strict';

describe('Service: SkyCanvasService', function () {

  // load the service's module
  beforeEach(module('angularfireApp'));

  // instantiate service
  var SkyCanvasService;
  beforeEach(inject(function (_SkyCanvasService_) {
    SkyCanvasService = _SkyCanvasService_;
  }));

  it('should do something', function () {
    expect(!!SkyCanvasService).toBe(true);
  });

});
