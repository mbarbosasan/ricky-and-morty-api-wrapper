import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LoadingService } from './loading.service';

@Component({
    selector: 'app-loading',
    imports: [],
    templateUrl: './loading.component.html',
    styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  private readonly loadingService = inject(LoadingService);

  show = toSignal(this.loadingService.show$);
}
