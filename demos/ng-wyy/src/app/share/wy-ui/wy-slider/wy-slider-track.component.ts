import { Component, OnInit, Input, SimpleChanges, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { WySliderStyle } from './wy-slider-types';

@Component({
  selector: 'app-wy-slider-track',
  template: `<div class="wy-slider-track" [ngStyle]="style"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class WySliderTrackComponent implements OnInit, OnChanges {
  // 默认水平
  @Input() wyVertical: boolean = false
  @Input() wyLength: number = 0
  style: WySliderStyle = {}
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    // 如果偏移量发生变化
    if (changes['wyLength']) {
      // this.style[this.wyVertical ? 'height' : 'width'] = this.wyLength + '%'
      if (this.wyVertical) {
        this.style.height = this.wyLength + '%'
        this.style.left = null
        this.style.width = null
      } else {
        this.style.width = this.wyLength + '%'
        this.style.bottom = null
        this.style.height = null
      }
    }
  }

}
