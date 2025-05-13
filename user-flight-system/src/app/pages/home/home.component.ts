import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StationsService } from '../../services/stations.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule , FormsModule],
  providers: [StationsService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  stations: string[] = [];

  constructor(private stationService: StationsService, private router: Router) {}

  ngOnInit(): void {
    this.stationService.getStations().subscribe((data) => {
      this.stations = data;
     }
  );
  }

  search(): void {
    const from = (document.getElementById('station-from') as HTMLSelectElement).value;
    const to = (document.getElementById('station-to') as HTMLSelectElement).value;
    const date = (document.getElementById('travel-date') as HTMLInputElement).value;

    console.log(`Searching flights from ${from} to ${to} on ${date}`);

    //navigate to flights result
    this.router.navigate(['/booking'],{ queryParams: { from, to, date } });
  }
}
