import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// 导入表单处理
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooComponent } from './foo/foo.component';

@NgModule({
  // 声明
  declarations: [
    AppComponent,
    FooComponent
  ],
  // 依赖模块
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  // 提供
  providers: [],
  // 启动
  bootstrap: [AppComponent]
})
export class AppModule { }
