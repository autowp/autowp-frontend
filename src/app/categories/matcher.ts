import { UrlSegment } from '@angular/router';

export function categoriesPathMatcher(url: UrlSegment[]) {
  if (url.length <= 0) {
    return null;
  }

  if (url[url.length - 1].path === 'pictures') {
    return null;
  }

  const consumed: UrlSegment[] = [];
  const path: string[] = [];
  for (let i = 0; i < url.length; i++) {
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

export function categoriesPicturesPathMatcher(url: UrlSegment[]) {
  if (url.length <= 1) {
    return null;
  }

  if (url[url.length - 1].path !== 'pictures') {
    return null;
  }

  const pictures = url.pop();

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
      consumed: consumed.concat([pictures]),
      posParams: {
        path: new UrlSegment(path.join('/'), {})
      }
    };
  }
  return null;
}
