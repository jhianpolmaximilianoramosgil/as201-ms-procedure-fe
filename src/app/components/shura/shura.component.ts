import { Component, Input } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-shura',
  templateUrl: './shura.component.html',
  styleUrls: ['./shura.component.css']
})
export class ShuraComponent {

  constructor(private router: Router
  ) {
    
  }
  ngOnInit(): void {
      this.router.navigate(['/procedure-colab']).then(); 
  }

}
