import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputComponent,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  type = input.required<string>();
  label = input.required<string>();
  id = input.required<string>();
  placeholder = input<string>('');

  value = signal('');
  onChange = (value: string) => {};
  onTouched = () => {};
  disabled = signal(false);

  writeValue(obj: string): void {
    this.value.set(obj);
  }
  registerOnChange(fn: (string: string) => string): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
