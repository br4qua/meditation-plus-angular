import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { ApiConfig } from '../../api.config.ts';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class WikiService {

  public constructor(public authHttp: AuthHttp) {
  }


  public post(formData: {}): Observable<any> {
    return this.authHttp.post(
      ApiConfig.url + '/api/wiki',
      JSON.stringify(formData), {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  }

  public getStructure(): Observable<any> {
    return this.authHttp.get(
      ApiConfig.url + '/api/wiki', {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
      }
    );
  }

  public query(category: string): Observable<any> {
    return this.authHttp.post(
      ApiConfig.url + '/api/wiki/videos',
      JSON.stringify({
        category: category
      }), {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
      }
    );
  }

  public search(search: string): Observable<any> {
    return this.authHttp.post(
      ApiConfig.url + '/api/wiki/search',
      JSON.stringify({
        search: search
      }), {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
      }
    );
  }

  public delete(testimonial) {
    return this.authHttp.delete(
      ApiConfig.url + '/api/testimonial/' + testimonial._id, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  }

}
