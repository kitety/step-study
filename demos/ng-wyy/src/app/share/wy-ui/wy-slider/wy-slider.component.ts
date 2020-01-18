import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, ViewChild, Input } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter, tap, pluck, map } from 'rxjs/internal/operators';
import { SliderEventType } from './wy-slider-types';

@Component({
  selector: 'app-wy-slider',
  templateUrl: './wy-slider.component.html',
  styleUrls: ['./wy-slider.component.less'],
  // 视图封装模式 全局样式进来，但是出不去
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class WySliderComponent implements OnInit {
  // 获取dom
  @ViewChild('wySlider', { static: true }) private wySlider: ElementRef
  // 或者下面的方式
  // constructor(private el: ElementRef) { }
  private sliderDom: HTMLDivElement
  // 输入属性，是否垂直
  @Input() wyVertical: boolean = false
  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.sliderDom = this.wySlider.nativeElement
    this.createDraggingObservables()
  }
  // 拖拽事件
  /**
   * pc mousedown mousemove mouseup==mouseEvent 
   *  e.pageX/pageY
   * mobile touchstart touchmove touchend touchevent
   *  e.touchs[0].pageX e.touchs[0].pageY
   */
  private createDraggingObservables() {
    const orientField = this.wyVertical ? 'pageY' : 'pageX'
    const mouse: SliderEventType = {
      start: 'mousedown',
      move: 'mousemove',
      end: 'mouseup',
      filter: (e: MouseEvent) => event instanceof MouseEvent,
      pluckKey: [orientField]
    }
    const touch: SliderEventType = {
      start: 'touchdown',
      move: 'touchmove',
      end: 'touchend',
      filter: (e: TouchEvent) => event instanceof TouchEvent,
      pluckKey: ['touches[0]', orientField]


    }
    [mouse, touch].forEach(source => {
      const { start, move, end, filter, pluckKey } = source
      // 分别绑定三种事件
      // filter 筛选出事件对象
      // tap 调试
      source.startPlucked$ = fromEvent(this.sliderDom, start).pipe(filter(filter), tap((e: Event) => {
        // 阻止冒泡和默认事件
        e.stopPropagation()
        e.preventDefault()
        // 获取位置
      }), pluck(...pluckKey)),
        map((position: number) => this.fildClosestValue(position))
    });
  }
  fildClosestValue() { }

}
