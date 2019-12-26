import { NgModule, InjectionToken } from '@angular/core';
// token 令牌
export const API_CONFIG = new InjectionToken('ApiConfigToken')
// 存放服务
// http之类的
@NgModule({
  declarations: [],
  imports: [
  ],
  // tree shake无用
  // providers: [HomeService]
  providers: [
    { provide: API_CONFIG, useValue: 'http://localhost:3000/' }
  ]
})
export class ServicesModule { }
