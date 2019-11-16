import { TestBed } from '@angular/core/testing';

import { IncomeService } from './income.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('IncomeService', () => {
  let service: IncomeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(IncomeService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call method get with url of get income api', () => {
    service.getIncomeByUserId().subscribe();

    const req = httpTestingController.expectOne(
      'http://103.74.254.157:9003/income/id/1'
    );
    expect(req.request.method).toBe('GET');
  });
});
