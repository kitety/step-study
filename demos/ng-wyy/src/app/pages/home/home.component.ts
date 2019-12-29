import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { Banner, SongSheet, HotTag } from 'src/app/services/data-types/common.types';
import { NzCarouselComponent } from 'ng-zorro-antd';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  banners: Banner[]
  hotTags: HotTag[]
  songSheetList: SongSheet[]
  // 激活的索引
  carouselActiveIndex = 0
  // 轮播组件实例
  @ViewChild(NzCarouselComponent, { static: true }) private nzCarousel: NzCarouselComponent
  constructor(private homeService: HomeService) {
    this.getBanners()
    this.getHotTags()
    this.getPersonalSheetList()
  }
  private getBanners() {
    this.homeService.getBanners().subscribe(banners => {
      console.log(banners);
      this.banners = banners
    })
  }
  private getHotTags() {
    this.homeService.getHotTags().subscribe(hotTags => {
      console.log(hotTags);
      this.hotTags = hotTags
    })
  }
  private getPersonalSheetList() {
    this.homeService.getPersonalSheetList().subscribe(songSheetList => {
      console.log(songSheetList);
      this.songSheetList = songSheetList
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
