import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingComponent } from './booking.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('BookingComponent', () => {
  let component: BookingComponent;
  let fixture: ComponentFixture<BookingComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ from: 'NYC', to: 'LAX', date: '2025-05-15' })
          }
        },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the BookingComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize query params', () => {
    expect(component.from).toBe('NYC');
    expect(component.to).toBe('LAX');
    expect(component.date).toBe('2025-05-15');
  });

  it('should navigate to /purchase and store flight in localStorage', () => {
    const testFlight = { id: 1, airline: 'TestAir', time: '12:00 PM', price: 300 };

    // Clear previous storage
    localStorage.removeItem('bookedFlights');

    component.bookNow(testFlight);

    const stored = JSON.parse(localStorage.getItem('bookedFlights') || '[]');
    expect(stored.length).toBe(1);
    expect(stored[0].airline).toBe('TestAir');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/purchase']);
  });
});
