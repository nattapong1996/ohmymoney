import { TestBed } from '@angular/core/testing';

import { IncomeService } from './income.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { IncomeRequest } from 'src/app/models/income-request';

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
      `${service.SERVER_URL}/income/id/${service.USER_ID}`
    );
    expect(req.request.method).toBe('GET');
  });

  it('should call method GET with url of getincome group api', () => {
    service.getIncomeGroup().subscribe();
    const request = httpTestingController.expectOne(`${service.SERVER_URL}/income/group`);
    expect(request.request.method).toBe('GET');
  });

  it('should call method POST with url of save income api', () => {
    const dataRequest = {
      amount: 50000,
      date: '12/31/2019',
      incomeGroupId: 3
    } as IncomeRequest;
    service.saveIncome(dataRequest).subscribe();
    const req = httpTestingController.expectOne(`${service.SERVER_URL}/income`);
    expect(req.request.method).toBe('POST');
  });

  it('should set income request body with user id when call method save income', () => {
    const dataRequest = {
      amount: 5000,
      date: '12/31/2019',
      incomeGroupId: 3
    } as IncomeRequest;

    const expected = {
      userId: 23,
      amount: 5000,
      date: '12/31/2019',
      incomeGroupId: 3
    } as IncomeRequest;

    service.saveIncome(dataRequest).subscribe();
    const req = httpTestingController.expectOne(`${service.SERVER_URL}/income`);
    expect(req.request.body).toEqual(expected);
  });

});
