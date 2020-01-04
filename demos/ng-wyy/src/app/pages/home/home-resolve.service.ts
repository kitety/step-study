import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { SingerService } from 'src/app/services/singer.service';
import { Banner, SongSheet, HotTag, Singer } from 'src/app/services/data-types/common.types';
import { Observable, forkJoin } from 'rxjs';
import { first } from 'rxjs/internal/operators';

type HomeDataType = [Banner[], HotTag[], SongSheet[], Singer[]]

/**
 * resolve 如果你在使用真实 api，很有可能数据返回有延迟，导致无法即时显示。 在这种情况下，直到数据到达前，显示一个空的组件不是最好的用户体验。
 */
// 路由守卫
@Injectable()
export class HomeResolverService implements Resolve<HomeDataType> {
  constructor(private homeService: HomeService,
    private singerService: SingerService, ) { }

  resolve(): Observable<HomeDataType> {
    // 类似于promise all,完成后发射
    return forkJoin([
      this.homeService.getBanners(),
      this.homeService.getHotTags(),
      this.homeService.getPersonalSheetList(),
      this.singerService.getEnterSinger(),
    ]).pipe(first())// 只取第一个，后面发几个都没用take(1)
  }
}
