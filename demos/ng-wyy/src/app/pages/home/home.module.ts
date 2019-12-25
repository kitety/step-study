import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { ShareModule } from 'src/app/share/share.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    // 每个页面都可以用到share module的模块
    // 要在最前面
    ShareModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
