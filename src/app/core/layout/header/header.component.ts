import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ButtonGroupComponent } from 'src/app/shared/ui/button-group/button-group.component';
import { ButtonGroup } from 'src/app/shared/ui/button-group/types/button-group.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage, ButtonGroupComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  headerButtons = signal<ButtonGroup[]>([
    {
      label: 'Início',
      type: 'link',
      routerLink: '/',
      selected: false,
      icon: 'home',
    },
    {
      label: 'Favoritos',
      type: 'link',
      routerLink: '/favoritos',
      selected: false,
      icon: 'star',
      badge: 10,
    },
  ]);
}
