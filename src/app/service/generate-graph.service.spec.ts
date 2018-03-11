import { TestBed, inject } from '@angular/core/testing';

import { GenerateGraphService } from './generate-graph.service';

describe('GenerateGraphService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenerateGraphService]
    });
  });

  it('should be created', inject([GenerateGraphService], (service: GenerateGraphService) => {
    expect(service).toBeTruthy();
  }));
});
