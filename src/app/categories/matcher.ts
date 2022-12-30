import {UrlSegment} from '@angular/router';

export function categoriesPathMatcher(url: UrlSegment[]) {
  if (url.length <= 0) {
    return null;
  }

  const consumed: UrlSegment[] = [];
  const path: string[] = [];
  for (const segment of url) {
    if (segment.path === 'pictures') {
      break;
    }
    if (segment.path === 'gallery') {
      break;
    }
    consumed.push(segment);
    path.push(segment.path);
  }

  return {
    consumed,
    posParams: {
      path: new UrlSegment(path.join('/'), {}),
    },
  };
}
