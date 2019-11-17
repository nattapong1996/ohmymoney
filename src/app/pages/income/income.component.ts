import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Income } from 'src/app/models/income';
import { HttpClient } from '@angular/common/http';
import { IncomeService } from 'src/app/services/incomes/income.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { IncomeGroup } from 'src/app/models/income-group';
import { IncomeRequest } from 'src/app/models/income-request';


@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {
  modalRef: BsModalRef;
  incomes: Income[];
  incomeForm: FormGroup;
  incomegroup: IncomeGroup[];
  constructor(
    private modalService: BsModalService,
    // private http: HttpClient,
    private incameService: IncomeService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.getIncomeByUserId();
    this.createForm();
    this.getIncomeGroup();
  }
  createForm() {
    this.incomeForm = this.fb.group({
      date: '',
      incomeGroupId: '',
      amount: ''
    });
  }

  getIncomeGroup() {
    this.incameService.getIncomeGroup().subscribe(res => {
      this.incomegroup = res;
    });
  }

  getIncomeByUserId() {
    this.incameService.getIncomeByUserId().subscribe(res => {
      this.incomes = res;
    });
  }
  
  onSubmit() {
    const data = {
      date: this.getDateISO(this.incomeForm.get('date').value),
      incomeGroupId: Number(this.incomeForm.get('incomeGroupId').value),
      amount: Number(this.incomeForm.get('amount').value)
    };
    this.incameService.saveIncome(data).subscribe(_ => {
      this.getIncomeByUserId();
      // this.modalRef.hide();
    });
  }

  getDateISO(date: string): string {
    return new Date(date).toISOString();
  }

  openEdit(template: TemplateRef<any>, incomes) {
  }
  edit(income: Income) {
    const data = {
      date: this.getDateISO(this.incomeForm.get('date').value),
      incomeGroupId: Number(this.incomeForm.get('incomeGroupId').value),
      amount: Number(this.incomeForm.get('amount').value)
    } as IncomeRequest;
    this.incameService.updateIncome(income.id, data);
  }
  updateIncome() {

  }
  deleteIncome() {

  }
}
