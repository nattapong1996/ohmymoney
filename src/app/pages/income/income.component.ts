import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Income } from 'src/app/models/income';
import { HttpClient } from '@angular/common/http';
import { IncomeService } from 'src/app/services/incomes/income.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { IncomeGroup } from 'src/app/models/income-group';


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
    this.getIncomeUserId();
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

  getIncomeUserId() {
    this.incameService.getIncomeByUserId().subscribe(res => {
      this.incomes = res;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onSubmit() {
    const data = {
      date: this.getDateISO(this.incomeForm.get('date').value),
      incomeGroupId: Number(this.incomeForm.get('incomeGroupId').value),
      amount: Number(this.incomeForm.get('amount').value)
    };
    this.incameService.saveIncome(data);
  }

  getDateISO(date: string): string {
    return new Date(date).toISOString();
  }

}
