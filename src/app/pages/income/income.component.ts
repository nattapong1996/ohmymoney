import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Income } from 'src/app/models/income';
import { HttpClient } from '@angular/common/http';
import { IncomeService } from 'src/app/services/incomes/income.service';


@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {
  modalRef: BsModalRef;
  incomes: Income[];
  constructor(
    private modalService: BsModalService,
    // private http: HttpClient,
    private incame: IncomeService
  ) { }

  ngOnInit() {
    this.getIncomeUserId();
  }

  getIncomeUserId() {
    this.incame.getIncomeByUserId().subscribe(res => {
      console.log(res);
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
