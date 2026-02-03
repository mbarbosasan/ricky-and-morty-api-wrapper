import { ComponentFixture, TestBed } from '@angular/core/testing';

import { inputBinding, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CharactersListComponent } from './characters-list.component';

describe('CharactersListComponent', () => {
  let component: CharactersListComponent;
  let fixture: ComponentFixture<CharactersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharactersListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharactersListComponent, {
      bindings: [
        inputBinding('charactersList', signal([{
      id: 1,
      created: 'teste',
      episode: ['1'],
      favorite: true,
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
    }]))
      ]
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should list characters', () => {
    const { debugElement } = fixture;

    const list = debugElement.queryAll(By.css('app-character-card'))

    expect(list.length).toBe(1);
  });
});
