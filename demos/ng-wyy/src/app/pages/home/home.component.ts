import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { Banner, SongSheet, HotTag, Singer } from 'src/app/services/data-types/common.types';
import { NzCarouselComponent } from 'ng-zorro-antd';
import { SingerService } from 'src/app/services/singer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  banners: Banner[]
  hotTags: HotTag[]
  songSheetList: SongSheet[]
  singers: Singer[]
  // 激活的索引
  carouselActiveIndex = 0
  // 轮播组件实例
  @ViewChild(NzCarouselComponent, { static: true }) private nzCarousel: NzCarouselComponent
  constructor(private homeService: HomeService, private singerService: SingerService) {
    this.getBanners()
    this.getHotTags()
    this.getPersonalSheetList()
    this.getEnterSingers()
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
  private getEnterSingers() {
    this.singerService.getEnterSinger().subscribe(singers => {
      console.log(singers);
      this.singers = singers
    })
  }

  ngOnInit() {
  }
  onNzBeforeChange({ to }) {
    this.carouselActiveIndex = to
  }
  onChangeSlide(type: 'pre' | 'next') {
    this.nzCarousel[type]()
  }

}
