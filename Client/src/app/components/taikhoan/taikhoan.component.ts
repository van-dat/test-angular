import { Component, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';


@Component({
  selector: 'app-taikhoan',
  templateUrl: './taikhoan.component.html',
  styleUrls: ['./taikhoan.component.css']
})
export class TaikhoanComponent {
  // 
  data: any
  dataSource = new MatTableDataSource<any>();
  idCurUser: any
  displayedColumns: string[] = ['Tên nhân viên', 'Mã nhân viên', 'Chức vụ']
  clickedRows = new Set<any>();
  constructor(private userSrv: UserService , private route : Router) {
    this.idCurUser = this.userSrv.checkLogin()
  }
  ngOnInit(): void {
    this.userSrv.getUser().subscribe(res => {
      this.data = res.data
      this.dataSource.data = this.data; // Gán dữ liệu cho dataSource
      this.dataSource.paginator = this.paginator;

    })
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onRowClick(row: any) {
    // Toggle row selection
    this.clickedRows.add(row); // Add the clicked row to the set
  for (const entry of this.clickedRows) {
    this.route.navigate(['home/thong-tin', entry.id])
  }
  this.clickedRows.delete(row)
  }
  
}
