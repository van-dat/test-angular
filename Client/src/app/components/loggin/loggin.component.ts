import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.css'],
})
export class LogginComponent implements OnInit {
  useApi: any;
  dataUser: FormGroup = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required]),
  });

  constructor(private userApi: UserService, private routerService: Router) {}

  navigate(url: string) {
    this.routerService.navigateByUrl(url);
  }

  ngOnInit(): void {
    // this.userApi.getUser().subscribe((res) => {
    //   this.useApi = res.rs
    // });
  }

  onSubmit(): void {
    if (this.dataUser.invalid) return;
    this.userApi.login(this.dataUser.value).subscribe((res: any) => {
      if (!res.rs) {
        alert(res.msg);
      } else {
        delete res.data.Password;
        const jsonData = JSON.stringify(res);
        sessionStorage.setItem('login', jsonData);
        this.navigate('home');
      }
    });
  }
}
