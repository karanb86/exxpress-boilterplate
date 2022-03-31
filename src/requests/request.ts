import { Request } from 'express';

export class BaseRequest {
  protected req: Request;

  constructor(req: Request) {
    this.req = req;
  }

  get body() {
    return this.req.body;
  }

  get baseUrl() {
    return this.req.baseUrl;
  }

  get params() {
    return this.req.params;
  }

  get query() {
    return this.req.query;
  }

  get search_query(): any {
    const { search_query } = this.query;
    if (typeof search_query === 'string') {
      return search_query;
    }
    return '';
  }

  get page(): any {
    const { page } = this.query;
    if (typeof page === 'string') {
      return +page;
    }
    return 1;
  }

  get include(): any {
    const { include } = this.query;
    if (typeof include === 'string') {
      return include.split(',');
    }
    return null;
  }

  param = (key: string) => {
    return this.params[key];
  };

  queryValue = (key: string) => {
    return this.query[key];
  };

  queryStringValue = (key: string): string => {
    const value = this.query[key];
    if (typeof value === 'string') {
      return value;
    }
    return '';
  };
}
