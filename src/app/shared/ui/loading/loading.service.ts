import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private readonly show = new BehaviorSubject(false);
  show$ = this.show.asObservable();

  setLoading(loading: boolean) {
    this.show.next(loading);
  }
}
