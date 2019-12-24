import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd/ng-zorro-antd.module';
import { FormsModule } from '@angular/forms';
// 存放全局经常会用到的组件指令模块


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
  ],
  // 共享的模块要导出，不然引用不到
  exports: [
    NgZorroAntdModule,
    FormsModule,
  ]
})
export class ShareModule { }
