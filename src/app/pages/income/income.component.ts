import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Income } from 'src/app/models/income';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {
  modalRef: BsModalRef;
  income: Income[];
  constructor(
    private modalService: BsModalService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get('http://103.74.254.157:9003/income/id/1')
      .subscribe((incomes: Income[]) => {
        this.income = incomes;
      });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
