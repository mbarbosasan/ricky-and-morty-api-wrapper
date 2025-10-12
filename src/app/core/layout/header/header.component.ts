import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { FavoriteCharactersService } from 'src/app/features/favoritos/services/favorite-characters.service';
import { ButtonGroupComponent } from 'src/app/shared/ui/button-group/button-group.component';
import { ButtonGroup } from 'src/app/shared/ui/button-group/types/button-group.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage, ButtonGroupComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  private readonly favoritesService = inject(FavoriteCharactersService);

  favorites = toSignal(this.favoritesService.favoriteCharacters$);

  headerButtons = computed<ButtonGroup[]>(() => [
    {
      label: $localize`:Botão de início do Header:Início`,
      type: 'link',
      routerLink: '/',
      selected: false,
      icon: 'home',
    },
    {
      label: $localize`:Botão de favoritos do Header:Favoritos`,
      type: 'link',
      routerLink: '/favoritos',
      selected: false,
      icon: 'star',
      badge: this.favorites()?.length,
    },
  ]);

  ngOnInit(): void {
    this.favoritesService.syncSessionStorage();
  }
}
