import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Income } from 'src/app/models/income';
import { HttpClient } from '@angular/common/http';
import { IncomeService } from 'src/app/services/incomes/income.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {
  modalRef: BsModalRef;
  incomes: Income[];
  incomeForm: FormGroup;
  constructor(
    private modalService: BsModalService,
    // private http: HttpClient,
    private incame: IncomeService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getIncomeUserId();
    this.createForm();
  }
  createForm() {
    this.incomeForm = this.fb.group({
      date: '',
      incomeGroupID: '',
      amount: ''
    });
  }

  getIncomeUserId() {
    this.incame.getIncomeByUserId().subscribe(res => {
      this.incomes = res;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  submit() {

  }

}
