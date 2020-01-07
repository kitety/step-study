import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_CONFIG, ServicesModule } from './services.module';
import { Observable } from 'rxjs';
import { SongSheet, Song } from './data-types/common.types';
import { map, pluck, switchMap } from 'rxjs/internal/operators';
import { SongService } from './song.service';


@Injectable({
  // 哪个模块提供的 root代表为app module
  // providedIn: 'root'
  // tree shake 生效
  providedIn: ServicesModule
})
export class SheetService {

  constructor(private http: HttpClient,
    @Inject(API_CONFIG) private uri: string,
    private SongServe: SongService
  ) { }
  getSongSheetDetail(id: number): Observable<SongSheet> {
    // HttpClient传参方式,单个参数
    const params = new HttpParams().set('id', id.toString())
    return this.http.get(this.uri + 'playlist/detail', { params }).pipe(map((res: { playlist: SongSheet }) => res.playlist))
  }
  playSheet(id: number): Observable<Song[]> {
    // 获取歌单详情
    // pluck('tracks') 从字段中取出 tracks
    return this.getSongSheetDetail(id).pipe(pluck('tracks'), switchMap(tracks => this.SongServe.getSongList(tracks)))
  }
}
