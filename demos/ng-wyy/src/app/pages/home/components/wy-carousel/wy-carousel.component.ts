import { Component, OnInit, TemplateRef, ViewChild, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-wy-carousel',
  templateUrl: './wy-carousel.component.html',
  styleUrls: ['./wy-carousel.component.less'],
  // 变更检测策略
  // 默认一个组件发生改变，会把那个组件树上关联的父子组件重新变更检测一遍，检测有无变化
  // OnPush input输入的时候才会变更检测，否则其他组件变化但是不影响输入属性，就不会变化
  // 性能提升关键
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyCarouselComponent implements OnInit {
  // true变更检测前解析，false变更后
  @ViewChild('dot', { static: true }) dotRef: TemplateRef<any>
  @Input() activeIndex = 0
  @Output() changeSlide = new EventEmitter<'pre' | 'next'>()
  constructor() { }

  ngOnInit() {
  }
  onChangeSlide(type: 'pre' | 'next') {
    this.changeSlide.emit(type)
  }

}
