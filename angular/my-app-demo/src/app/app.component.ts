import { Component } from '@angular/core';

// 在ng，组件就是一个类
// 装饰器
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'my-app-demo';
  count = 0
  increment() {
    this.count++
  }
}
