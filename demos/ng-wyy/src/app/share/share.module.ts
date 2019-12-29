import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { WyUiModule } from './wy-ui/wy-ui.module';
// 存放全局经常会用到的组件指令模块
// 公共
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    WyUiModule
  ],
  // 共享的模块要导出，不然引用不到
  exports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    WyUiModule,
  ],
})
export class ShareModule { }
