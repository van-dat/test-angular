import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChamcongService } from 'src/app/services/chamcong.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private loginSvr: UserService, private routerService: Router, private chamcongSvr: ChamcongService) {
    this.dataLocalStorage = this.loginSvr.checkLogin();
  }


  navigate(url: string) {
    this.routerService.navigateByUrl(url);

  }
  dataLocalStorage: any
  isLogin: any;
  pathMenu: any;
  menu = [
    {
      path: '',
      text: 'Hệ thống',
      icon: 'now_widgets',
    },
    {
      path: 'thong-tin',
      text: 'Thông tin',
      icon: 'manage_accounts',
    },
    {
      path: 'chamcong',
      text: 'Chấm công ',
      icon: 'check_circle',
    },
    {
      path: 'tk',
      text: 'Tài kHoản',
      icon: 'account_circle',
    },
    {
      path: '',
      text: 'Đăng Xuất',
      icon: 'logout',
    },
  ];
  ngOnInit(): void {
   

    this.isLogin = this.loginSvr.checkLogin();
    if (this.isLogin.data.Role_code !== 'QL') {
      this.pathMenu = this.menu.filter(i => i.text !== 'Tài kHoản')
    } else {
      this.pathMenu = this.menu
    }

  }

  handleLogoutClick(): void {
    localStorage.removeItem('login')
    this.navigate('')
  }


}
