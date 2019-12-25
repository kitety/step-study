import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [],
  imports: [
    // 每个页面都可以用到share module的模块
    ShareModule
  ]
})
export class PagesModule { }
