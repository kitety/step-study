import { Injectable, Inject } from '@angular/core';
import { ServicesModule, API_CONFIG } from './services.module';
import { Singer } from './data-types/common.types';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/internal/operators'
import queryString from 'query-string'

type SingerParams = {
  offset: number
  limit: number
  cat?: string
}
const defaultParams: SingerParams = {
  offset: 0,
  limit: 9,
  cat: '5001',
}

@Injectable({
  // 哪个模块提供的 root代表为app module
  // providedIn: 'root'
  // tree shake 生效
  providedIn: ServicesModule
})
export class SingerService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private uri: string) { }
  getEnterSinger(args: SingerParams = defaultParams): Observable<Singer[]> {
    // HttpClient传参方式
    const params = new HttpParams({ fromString: queryString.stringify(args) })
    return this.http.get(this.uri + 'artist/list', { params }).pipe(map((res: { artists: Singer[] }) => res.artists))
  }
}
