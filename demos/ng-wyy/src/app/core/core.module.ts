import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServicesModule } from '../services/services.module';
import { PagesModule } from '../pages/pages.module';
import { ShareModule } from '../share/share.module';
import zh from '@angular/common/locales/zh';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd';


// app 模块总经理，core 副经理

registerLocaleData(zh);
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ServicesModule,
    PagesModule,
    ShareModule,
    // 路由在最后 不然有问题
    AppRoutingModule,
  ],
  // 存放服务
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  // 要到处才能使用
  exports: [
    ShareModule,
    AppRoutingModule,
  ]
})
export class CoreModule {
  // 第一次parentModule不存在，第二次才存在
  // 不断注入自己会死循环，因此要跳过一下
  // 查找CoreModule的时候跳过自身，去父module中查找有没有我CoreModule
  // 没找到的话就会抛出错误，第一次是不存在的，因此允许CoreModule是不存在的
  constructor(@SkipSelf() @Optional() parentModule: CoreModule) {
    // 只被app module引用，其他不行
    if (parentModule) {
      throw new Error('core module 只能被AppModule引入')
    }
  }
}
