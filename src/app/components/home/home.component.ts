import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public tiles: any[] = [];

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.apiCallForTile()
  }
  private apiCallForTile() {
    this.dataService.getData().subscribe((data: any) => {
      this.tiles = data.data;
    });
  }

  public navigateToDetail(tabIdentifier: string): void {
    this.router.navigate([tabIdentifier]);
  }
}