import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  file: any;
  transactions: any[] = [];

  totalSales: number = 0;
  totalPurchase: number = 0;
  totalGST: number = 0;

  baseUrl = 'http://localhost:8080/api/transactions';

  constructor(private http: HttpClient) {}

  // File select
  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  // Upload API
  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.file);

    this.http.post(`${this.baseUrl}/upload`, formData, { responseType: 'text' })
      .subscribe(res => {
        alert(res);
      });
  }

  // Show Table Data
  showSummary() {
    this.http.get<any>('http://localhost:8080/api/transactions/summarywithallData')
      .subscribe(res => {
        this.transactions = res.data;
      });
  }

  // Calculate Values
  calculate() {
    this.http.get<any>('http://localhost:8080/api/transactions/summarywithallData')
      .subscribe(res => {
        this.totalSales = res.totalSales;
        this.totalPurchase = res.totalPurchase;
        this.totalGST = res.totalGST;
      });
  }
}
