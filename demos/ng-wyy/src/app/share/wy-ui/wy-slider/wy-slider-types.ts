import { Observable } from 'rxjs'

export type WySliderStyle = {
  width?: string | null
  height?: string | null
  left?: string | null
  bottom?: string | null
}
export type SliderEventType = {
  start: string
  move: string
  end: string
  filter: (e: Event) => boolean
  pluckKey: string[]
  startPlucked$?: Observable<number>
  moveResolve$?: Observable<number>
  end$?: Observable<Event>
}
