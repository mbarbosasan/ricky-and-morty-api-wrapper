import { Component, computed, input, output } from '@angular/core';
import { ButtonComponent } from 'src/app/shared/ui/button/button.component';
import { CharacterSearchMetadata } from '../services/model/character.model';

@Component({
    selector: 'app-paginator',
    imports: [ButtonComponent],
    templateUrl: './paginator.component.html',
    styleUrl: './paginator.component.css'
})
export class PaginatorComponent {
  metadata = input.required<CharacterSearchMetadata>();
  pageChanged = output<number>();

  actualPage = computed(() => {
    if (this.metadata().next) {
      return Number(this.metadata().next) - 1;
    }
    return this.metadata().pages;
  });

  pages = computed(() => Array.from({ length: this.metadata().pages }).map((_, index) => index + 1));
}
