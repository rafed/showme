import { TestBed, inject } from '@angular/core/testing';

import { SearchResultService } from './search-result.service';

describe('SearchResultService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchResultService]
    });
  });

  it('should be created', inject([SearchResultService], (service: SearchResultService) => {
    expect(service).toBeTruthy();
  }));
});
