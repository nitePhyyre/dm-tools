import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Monster } from '../models/monster';
// import { MessageService } from './message.service';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class MonsterManualService {
  private _data: BehaviorSubject<Monster[]> = new BehaviorSubject([]);
  public readonly data: Observable<Monster[]> = this._data.asObservable();

  // private monstersUrl = 'http://dm-tools.local/api/monsters';  // URL to web api
  private monstersUrl = 'assets/monsters.json';
  private _http: HttpClient;

  constructor(
    private http: HttpClient,
    /* private messageService: MessageService */) {
    this._http = http;
  }

  /** GET Monster from the server */
  getMonsters(): Observable<Monster[]> {

    return this.http.get<Monster[]>(this.monstersUrl).map((monsters) => {
      monsters = _.map(monsters, (monster) => new Monster(monster));
      this._data.next(monsters);
      return monsters;
    });
  }

  refresh() {
    this._data.next(this._data.getValue());
  }
  /* GET Monster whose name contains search term */
  searchMonster(term: string): Observable<Monster[]> {
    if (!term.trim()) {
      // if not search term, return empty Monster array.
      return of([]);
    }
    return this.http.get<Monster[]>(`${this.monstersUrl}`)
      .map((monsters) => {
        monsters = _.map(monsters, (monster) => new Monster(monster))
          .filter((monster) => monster.name.toLowerCase().indexOf(term.toLowerCase()) > -1);
        return monsters;
      });
  }

  /** GET Monster by id. Return `undefined` when id not found */
  getMonsterNo404<Data>(id: number): Observable<Monster> {
    const url = `${this.monstersUrl}/?id=${id}`;
    return this.http.get<Monster[]>(url)
      .pipe(
        map((monster) => monster[0]), // returns a {0|1} element array
        tap((h) => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} Monster id=${id}`);
        }),
        catchError(this.handleError<Monster>(`getMonster id=${id}`))
      );
  }

  /** GET Monster by id. Will 404 if id not found */
  getMonster(id: number): Observable<Monster> {
    const url = `${this.monstersUrl}/${id}`;
    return this.http.get<Monster>(url).pipe(
      tap(() => this.log(`fetched Monster id=${id}`)),
      catchError(this.handleError<Monster>(`getMonster id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Monster to the server */
  // addMonster (Monster: Monster): Observable<Monster> {
  //   return this.http.post<Monster>(this.monstersUrl, Monster, httpOptions).pipe(
  //     tap((_Monster: Monster) => this.log(`added Monster w/ id=${_Monster.id}`)),
  //     catchError(this.handleError<Monster>('addMonster'))
  //   );
  // }

  /** DELETE: delete the Monster from the server */
  // deleteMonster (Monster: Monster | number): Observable<Monster> {
  //   const id = typeof Monster === 'number' ? Monster : Monster.id;
  //   const url = `${this.monstersUrl}/${id}`;

  //   return this.http.delete<Monster>(url, httpOptions).pipe(
  //     tap(_ => this.log(`deleted Monster id=${id}`)),
  //     catchError(this.handleError<Monster>('deleteMonster'))
  //   );
  // }

  /** PUT: update the Monster on the server */
  // updateMonster (Monster: Monster): Observable<any> {
  //   return this.http.put(this.monstersUrl, Monster, httpOptions).pipe(
  //     tap(_ => this.log(`updated Monster id=${Monster.id}`)),
  //     catchError(this.handleError<any>('updateMonster'))
  //   );
  // }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a MonsterService message with the MessageService */
  private log(message: string) {
    // this.messageService.add('MonsterService: ' + message);
  }
}
