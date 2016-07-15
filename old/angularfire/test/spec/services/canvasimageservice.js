'use strict';

describe('Service: CanvasImageService', function () {

  // load the service's module
  beforeEach(module('angularfireApp'));

  // instantiate service
  var CanvasImageService;
  beforeEach(inject(function (_CanvasImageService_) {
    CanvasImageService = _CanvasImageService_;
  }));

  it('should do something', function () {
    expect(!!CanvasImageService).toBe(true);
  });

});
