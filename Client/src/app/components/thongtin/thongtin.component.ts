import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-thongtin',
  templateUrl: './thongtin.component.html',
  styleUrls: ['./thongtin.component.css'],
})
export class ThongtinComponent implements OnInit {
  selectDate: any 
  idLocalStorage: any
  DataOneUser:any
  id: any
  changeText : boolean = false


  dataUpdate  = {
    Name : null,
    Gioi_tinh : null,
    Ngay_sinh :  null,
    Dia_chi : null,
  }

  
  constructor(private userSrv: UserService, private route: ActivatedRoute) {
    this.idLocalStorage = this.userSrv.checkLogin().data.id
  }
  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) {
      this.idLocalStorage = this.route.snapshot.paramMap.get('id');
    }
    this.userSrv.getOneUser(this.idLocalStorage).subscribe(res => {
      if(res.rs ===  true) {
        this.DataOneUser = res.data
      }
      this.selectDate = this.DataOneUser.Ngay_sinh
    })
  }
  capnhat(): void {
    this.userSrv.updateUser(this.idLocalStorage, this.dataUpdate).subscribe(res => {
      console.log(res)
      console.log(this.dataUpdate)
    })
  }
 
}
