import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEmptyStateComponent } from './search-empty-state.component';

describe('SearchEmptyStateComponent', () => {
  let component: SearchEmptyStateComponent;
  let fixture: ComponentFixture<SearchEmptyStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchEmptyStateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchEmptyStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
