import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
@NgModule({
  // 依赖当前模块的指令组件管道
  declarations: [
    AppComponent
  ],
  // 引入依赖模块
  imports: [
    CoreModule
  ],
 
  // 启动入口组件
  bootstrap: [AppComponent]
})
export class AppModule { }
