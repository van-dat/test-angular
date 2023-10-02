import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ChamcongService } from 'src/app/services/chamcong.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chamcong',
  templateUrl: './chamcong.component.html',
  styleUrls: ['./chamcong.component.css'],
})
export class ChamcongComponent implements OnInit, AfterViewInit {
  dataLocalStorage: any;
  data: any
  status: any
  chamcongq: any
  formatDate: any = ''
  displayedColumns: string[] = [
    // 'STT',
    'Nhân viên',
    'Mã nhân viên',
    'Ngày',
    'Thời gian',
    'Trạng Thái',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<any>();

  constructor(
    private apiChamcong: ChamcongService,
    private localStorage: UserService,
    private route: Router
  ) {

  }
  ngOnInit(): void {
    this.dataLocalStorage = this.localStorage.checkLogin();
    this.apiChamcong
      .getChamcongUser(this.dataLocalStorage.data.id)
      .subscribe((res) => {
        this.data = res.data;
        this.dataSource.data = this.data;
        this.dataSource.paginator = this.paginator;
        this.formatDate = this.data.at(-1).Status
      });
  }
  navigate(url: string): void {
    this.route.navigateByUrl(url)
  }

  ngAfterViewInit(): void { }
  chamcong(): void {
    this.apiChamcong.chamcong('0').subscribe(res => {
      this.chamcongq = res
      console.log(this.chamcongq)
      const json = JSON.stringify(this.chamcongq.data.Status)
      localStorage.setItem('status', json)
    })
  }
}
