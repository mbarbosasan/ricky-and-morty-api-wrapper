import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritosComponent {}
