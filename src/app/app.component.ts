import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterModule, CommonModule ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  standalone: true
})
export class AppComponent {
  title = 'game';
}
