import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_CONFIG, ServicesModule } from './services.module';
import { Observable, observable } from 'rxjs';
import { SongSheet, SongUrl, Song } from './data-types/common.types';
import { map } from 'rxjs/internal/operators';


@Injectable({
  // 哪个模块提供的 root代表为app module
  // providedIn: 'root'
  // tree shake 生效
  providedIn: ServicesModule
})
export class SongService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private uri: string) { }
  // 获取歌曲的播放地址
  getSongUrl(ids: string): Observable<SongUrl[]> {
    // HttpClient传参方式,单个参数
    const params = new HttpParams().set('id', ids)
    return this.http.get(this.uri + 'song/url', { params }).pipe(map((res: { data: SongUrl[] }) => res.data))
  }
  getSongList(songs: Song | Song[]): Observable<Song[]> {
    const songArr = Array.isArray(songs) ? songs.slice() : [songs]
    const ids = songArr.map(item => item.id).join(',')
    return Observable.create(observable => {
      this.getSongUrl(ids).subscribe(urls => {
        observable.next(this.gennerateSongList(songArr, urls))
      })
    })
  }
  // 负责拼接
  private gennerateSongList(songs: Song[], urls: SongUrl[]): Song[] {
    const result = []
    songs.forEach(song => {
      const url = urls.find(url => url.id === song.id).url
      if (url) {
        result.push({ ...song, url })
      }
    })
    return result
  }
}
