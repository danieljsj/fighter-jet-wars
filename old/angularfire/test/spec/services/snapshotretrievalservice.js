'use strict';

describe('Service: SnapshotRetrievalService', function () {

  // load the service's module
  beforeEach(module('angularfireApp'));

  // instantiate service
  var SnapshotRetrievalService;
  beforeEach(inject(function (_SnapshotRetrievalService_) {
    SnapshotRetrievalService = _SnapshotRetrievalService_;
  }));

  it('should do something', function () {
    expect(!!SnapshotRetrievalService).toBe(true);
  });

});
