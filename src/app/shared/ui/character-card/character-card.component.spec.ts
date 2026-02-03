import { ComponentFixture, TestBed } from '@angular/core/testing';

import { inputBinding, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CharacterWithFavorite } from 'src/app/features/inicio/services/model/character.model';
import { CharacterCardComponent } from './character-card.component';

const mockCharacter: CharacterWithFavorite = {
      id: 1,
      created: 'teste',
      episode: ['1'],
      favorite: false,
      gender: 'Female',
      image: 'http://localhost:4200',
      location: {
        name: 'teste',
        url: 'teste'
      },
      name: 'teste',
      origin: {
        name: 'teste',
        url: 'teste'
      },
      species: ['teste'],
      status: 'Alive',
      type: 'teste',
      url: 'teste',
    }

describe('CharacterCardComponent', () => {
  let component: CharacterCardComponent;
  let fixture: ComponentFixture<CharacterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterCardComponent, {
      bindings: [
        inputBinding('character', signal(mockCharacter))
      ]
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show card', () => {
    const { debugElement } = fixture;

    const card = debugElement.query(By.css('.character-card'));

    expect(card).toBeTruthy();
  })

  it('should emit action favorite', () => {
    const { debugElement } = fixture;
    const spy = spyOn(component, 'emitActionFavorite');


    const button = debugElement.query(By.css('.character-image-header'))

    button.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should emit add favorite when character not favorite', () => {
    const noFavoriteCharacter = {
      ...mockCharacter,
      favorite: false,
    }
    const spy = spyOn(component.addFavorite, 'emit');

    component.emitActionFavorite(noFavoriteCharacter);

    expect(spy).toHaveBeenCalled();
  })

  it('should emit remove favorite when character favorite', () => {
    const favoriteCharacter = {
      ...mockCharacter,
      favorite: true,
    }

    const spy = spyOn(component.removeFavorite, 'emit');

    component.emitActionFavorite(favoriteCharacter);

    expect(spy).toHaveBeenCalled();
  })
});
