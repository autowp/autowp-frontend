export interface APIAccountStartPostResponse {
  url: string;
}

export interface APIAccountItemsGetResponse {
  items: APIAccount[];
}

export interface APIAccount {
  can_remove: boolean;
  icon: string;
  id: number;
  link: string;
  name: string;
}
