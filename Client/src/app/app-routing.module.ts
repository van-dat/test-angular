import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogginComponent } from './components/loggin/loggin.component';
import { HomeComponent } from './components/home/home.component';
import { ChamcongComponent } from './components/chamcong/chamcong.component';
import { ThongtinComponent } from './components/thongtin/thongtin.component';
import { TaikhoanComponent } from './components/taikhoan/taikhoan.component';

const routes: Routes = [
  {
    path: '',
    component: LogginComponent,
    children: [],
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'chamcong',
        component: ChamcongComponent,
      },
      {
        path: 'thong-tin',
        component: ThongtinComponent,
      },
      
      {
        path: 'thong-tin/:id',
        component: ThongtinComponent,
      },
      {
        path: 'tk',
        component: TaikhoanComponent,
      },
      { path: '', redirectTo: 'chamcong', pathMatch: 'full' },
    ],
  },
  {
    path: 'login',
    component: LogginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
