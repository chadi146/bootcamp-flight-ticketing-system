<<<<<<< HEAD
import { ComponentFixture, TestBed } from '@angular/core/testing';
=======
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
>>>>>>> feature/admin-dashboard

import { BookingComponent } from './booking.component';

describe('BookingComponent', () => {
  let component: BookingComponent;
  let fixture: ComponentFixture<BookingComponent>;

<<<<<<< HEAD
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingComponent]
    })
    .compileComponents();
=======
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();
>>>>>>> feature/admin-dashboard

    fixture = TestBed.createComponent(BookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
<<<<<<< HEAD
  });
=======
  }));
>>>>>>> feature/admin-dashboard

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
