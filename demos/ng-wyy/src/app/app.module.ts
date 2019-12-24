import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { CoreModule } from './core/core.module';

registerLocaleData(zh);

@NgModule({
  // 依赖当前模块的指令组件管道
  declarations: [
    AppComponent
  ],
  // 引入依赖模块
  imports: [

    CoreModule
  ],
  // 存放服务
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  // 启动入口组件
  bootstrap: [AppComponent]
})
export class AppModule { }
