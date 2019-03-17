import { UrlSegment } from '@angular/router';

export function categoriesPathMatcher(url: UrlSegment[]) {
  if (url.length <= 0) {
    return null;
  }

  const consumed: UrlSegment[] = [];
  const path: string[] = [];
  for (let i = 0; i < url.length; i++) {
    if (url[i].path === 'pictures') {
      break;
    }
    consumed.push(url[i]);
    path.push(url[i].path);
  }

  if (consumed.length > 0) {
    return {
      consumed: consumed,
      posParams: {
        path: new UrlSegment(path.join('/'), {})
      }
    };
  }
  return null;
}
