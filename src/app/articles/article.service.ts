import {Injectable} from '@angular/core';
import {APIUser} from '@services/user';
import {APIPaginator, APIService} from '@services/api.service';
import {Observable} from 'rxjs';

export interface APIArticle {
  id: number;
  date: string;
  description: string;
  name: string;
  preview_url: string;
  author: APIUser;
  catname: string;
  enabled: boolean;
  html: string;
}

export interface APIArticlesGetResponse {
  items: APIArticle[];
  paginator: APIPaginator;
}

export interface APIArticlesGetOptions {
  page?: number;
  limit: number;
  fields: string;
  catname?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private api: APIService) {}

  public getArticles$(options: APIArticlesGetOptions): Observable<APIArticlesGetResponse> {
    const params: {[param: string]: string} = {};

    if (options.page) {
      params.page = options.page.toString();
    }

    if (options.limit) {
      params.limit = options.limit.toString();
    }

    if (options.fields) {
      params.fields = options.fields;
    }

    if (options.catname) {
      params.catname = options.catname;
    }

    return this.api.request<APIArticlesGetResponse>('GET', 'article', {
      params,
    });
  }
}
