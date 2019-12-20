import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.less']
})
export class FooComponent implements OnInit {

  constructor() {
  }
  //  Angular 在创建组件后立刻调用
  ngOnInit() {
    console.log(this);
  }

}
