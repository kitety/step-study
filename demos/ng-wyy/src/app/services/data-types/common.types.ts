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
// 歌单
export type SongSheet = {
  id: number
  name: string
  playCount: number,
  picUrl: string,
}
// 歌手
export type Singer = {
  id: number
  name: string
  picUrl: string,
  albumSize: number,
}
