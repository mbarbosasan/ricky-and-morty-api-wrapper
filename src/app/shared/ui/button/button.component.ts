import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  type = input.required<'button' | 'link'>();
  variant = input.required<'primary' | 'secondary'>();
  label = input.required<string>();
  icon = input<string>();
  badge = input<number>();
  routerLink = input<string>();
  enableRouterLinkActive = input<boolean>(false);

  onClick = output<void>();

  classes = computed(() => `${this.baseClasses()} ${this.classVariant()} ${this.classType()}`);

  baseClasses = signal('button');
  classVariant = computed(() => `button-${this.variant()}`);
  classType = computed(() => `button-${this.type()}`);
}
