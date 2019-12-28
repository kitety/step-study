import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { Banner } from 'src/app/services/data-types/common.types';
import { NzCarouselComponent } from 'ng-zorro-antd';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  banners: Banner[]
  // 激活的索引
  carouselActiveIndex = 0
  // 轮播组件实例
  @ViewChild(NzCarouselComponent, { static: true }) private nzCarousel: NzCarouselComponent
  constructor(private homeService: HomeService) {

    this.homeService.getBanners().subscribe(banners => {
      console.log(banners);
      this.banners = banners
    })
  }

  ngOnInit() {
  }
  onNzBeforeChange({ to }) {
    this.carouselActiveIndex = to
    console.log(to);
  }
  onChangeSlide(type: 'pre' | 'next') {
    this.nzCarousel[type]()
  }

}
