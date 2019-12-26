import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-wy-carousel',
  templateUrl: './wy-carousel.component.html',
  styleUrls: ['./wy-carousel.component.less']
})
export class WyCarouselComponent implements OnInit {
  // true变更检测前解析，false变更后
  @ViewChild('dot', { static: true })
  dotRef: TemplateRef<any>
  constructor() { }

  ngOnInit() {
  }

}
