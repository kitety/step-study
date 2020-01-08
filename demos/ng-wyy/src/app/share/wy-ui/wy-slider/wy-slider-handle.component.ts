import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { WySliderStyle } from './wy-slider-types';

@Component({
  selector: 'app-wy-slider-handle',
  template: `<div class="wy-slider-handle" [ngStyle]="style"></div>`,
  // 变更检测策略
  changeDetection: ChangeDetectionStrategy.OnPush
})
// OnChanges 监听发生变化
export class WySliderHandleComponent implements OnInit, OnChanges {
  // 默认水平
  @Input() wyVertical: boolean = false
  @Input() wyOffset: number = 0

  style: WySliderStyle = {}
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    // 如果偏移量发生变化
    if (changes['wyOffset']) {
      this.style[this.wyVertical ? 'bottom' : 'left'] = this.wyOffset + '%'
    }
  }

}
