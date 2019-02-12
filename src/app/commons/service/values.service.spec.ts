import { TestBed } from '@angular/core/testing';

import { ValuesService } from './values.service';

describe('ValuesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValuesService = TestBed.get(ValuesService);
    expect(service).toBeTruthy();
  });
  it('should be languageid to obsvle', () => {
    const service: ValuesService = TestBed.get(ValuesService);
    service.currentLanguageId().subscribe((lang => {
      expect(lang).toEqual(1);
    }));
    service.setLanguageId(1);
  });
  it('should be qiye to obsvle', () => {
    const service: ValuesService = TestBed.get(ValuesService);
    service.currentQiye().subscribe((lang => {
      expect(lang.id).toEqual(1);
    }));
    service.setQiye({id: 1});
  });
});
