import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeComponent } from './income.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { IncomeService } from 'src/app/services/incomes/income.service';
import { Income } from 'src/app/models/income';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { IncomeGroup } from 'src/app/models/income-group';
import { IncomeRequest } from 'src/app/models/income-request';

describe('IncomeComponent', () => {
  let component: IncomeComponent;
  let fixture: ComponentFixture<IncomeComponent>;
  let incomeService: IncomeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IncomeComponent],
      imports: [
        ModalModule.forRoot(),
        HttpClientModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeComponent);
    component = fixture.componentInstance;
    incomeService = TestBed.get(IncomeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getIncomeByUserid', () => {
    let expected: Income[];
    beforeEach(() => {
      expected = [
        {
          id: 1,
          incomeGroupId: 1,
          incomeGroupName: 'งานประจำ',
          amount: 100000,
          date: '1/31/2019'
        }
      ];
      spyOn(incomeService, 'getIncomeByUserId').and.returnValue(of(expected));
      component.ngOnInit();
      expect(component.incomes).toEqual(expected);
    });
  });

  describe('Create reactive form', () => {

    it('should set empty in date of form', () => {
      component.ngOnInit();
      expect(component.incomeForm.controls.date.value).toBe('');
    });

    it('should set empty income gruop id of form', () => {
      component.ngOnInit();
      expect(component.incomeForm.controls.incomeGroupId.value).toBe('');
    });

    it('should set empty in amount of form', () => {
      component.ngOnInit();
      expect(component.incomeForm.controls.amount.value).toBe('');
    });
  });

  it('shold call method get IncomeGroup when call ngOnInit', () => {
    spyOn(incomeService, 'getIncomeGroup').and.returnValue(of([]));
    component.ngOnInit();
    expect(incomeService.getIncomeGroup).toHaveBeenCalled();
  });

  it('should set data incomeGroup when call getIncomeGroup api is success', () => {
    const expected = [
      {
        id: 1,
        name: 'เงินเดือน'
      }
    ] as IncomeGroup[];
    spyOn(incomeService, 'getIncomeGroup').and.returnValue(of(expected));
    component.ngOnInit();
    expect(component.incomegroup).toBe(expected);
  });

  it('should call method save income when click submit', () => {
    component.incomeForm.get('date').setValue('11/15/2019');
    component.incomeForm.get('incomeGroupId').setValue('3');
    component.incomeForm.get('amount').setValue('50000');

    spyOn(incomeService, 'saveIncome').and.returnValue(of());
    spyOn(component, 'getDateISO').and.returnValue('2019-11-15T17:58:17.318Z');

    const expected = {
      amount: 50000,
      date: '2019-11-15T17:58:17.318Z',
      incomeGroupId: 3
    } as IncomeRequest;
    component.onSubmit();
    expect(incomeService.saveIncome).toHaveBeenCalledWith(expected);
  });

  it('shold call getincome by userID when called save income success', () => {
    component.incomeForm.get('date').setValue('11/15/2019');
    component.incomeForm.get('incomeGroupId').setValue('3');
    component.incomeForm.get('amount').setValue('50000');

    spyOn(incomeService, 'saveIncome').and.returnValue(of([]));
    spyOn(component, 'getDateISO').and.returnValue('2019-11-15T17:58:17.318Z');

    spyOn(incomeService, 'getIncomeByUserId').and.returnValue(of([]));

    component.onSubmit();
    expect(incomeService.getIncomeByUserId).toHaveBeenCalled();
  });

  it('should call UpdateIncome service when click edit', () => {
    spyOn(incomeService, 'updateIncome');
    component.incomeForm.get('date').setValue('2019-11-15T17:58:17.318Z');
    component.incomeForm.get('incomeGroupId').setValue('1');
    component.incomeForm.get('amount').setValue('100000');
    spyOn(component, 'getDateISO').and.returnValue('2019-11-15T17:58:17.318Z');

    const input = {
      id: 1,
      incomeGroupId: 1,
      incomeGroupName: 'งานประจำ',
      amount: 100000,
      date: '2019-11-15T17:58:17.318Z',
    } as Income;

    const dateUpdate = {
      incomeGroupId: 3,
      amount: 100000,
      date: '2019-11-15T17:58:17.318Z',
    } as IncomeRequest;

    component.edit(input);
    expect(incomeService.updateIncome).toHaveBeenCalledWith(input.id, dateUpdate);
  });
});
