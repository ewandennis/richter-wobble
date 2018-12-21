import { arrayOf } from './array';

export const segment1D = (a, b, resolution) => arrayOf(resolution).map(segmentIdx => a + ((segmentIdx/resolution) * (b-a)));
export const horizontalSegment = (p1, p2, resolution) => segment1D(p1.x, p2.x, resolution).map(x => ( {x, y: p1.y }));
