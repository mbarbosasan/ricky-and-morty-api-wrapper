import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { ButtonGroup } from './types/button-group.model';

@Component({
    selector: 'app-button-group',
    imports: [ButtonComponent],
    templateUrl: './button-group.component.html',
    styleUrl: './button-group.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonGroupComponent {
  buttons = input.required<ButtonGroup[]>();

  selectedButton = signal<null | number>(null);

  buttonsModel = computed(() => {
    if (this.selectedButton() === null) return this.buttons();
    return this.buttons().map((button, index) => ({
      ...button,
      selected: this.selectedButton() === index ? !button.selected : button.selected,
    }));
  });
}
