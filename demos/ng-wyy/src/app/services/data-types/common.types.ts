// 轮播图
export type Banner = {
  imageUrl: string
  url: string
  targetId: number
}
// 热门标签
export type HotTag = {
  id: number
  name: string
  position: number
}

// 歌手
export type Singer = {
  id: number
  name: string
  picUrl: string,
  albumSize: number,
}
// 歌曲
export type Song = {
  id: number
  name: string
  url: string,
  // 歌手的数组
  ar: Singer[],
  // 播放时长
  dt: number
  // 这首歌的专辑
  al: {
    id: number
    name: string
    picUrl: string,
  }
}

// 歌单
export type SongSheet = {
  id: number
  name: string
  playCount: number,
  picUrl: string,
  tracks: Song[]
}
// 歌曲URL
export type SongUrl = {
  id: number,
  url: string
}
