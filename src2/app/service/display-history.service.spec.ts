import { TestBed, inject } from '@angular/core/testing';

import { DisplayHistoryService } from './display-history.service';

describe('DisplayHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DisplayHistoryService]
    });
  });

  it('should be created', inject([DisplayHistoryService], (service: DisplayHistoryService) => {
    expect(service).toBeTruthy();
  }));
});
