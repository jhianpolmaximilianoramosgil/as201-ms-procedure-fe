import { Component, Input } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-viewRender',
  templateUrl: './viewRender.component.html',
  styleUrls: ['./viewRender.component.css']
})
export class viewRenderComponent {

  constructor(private router: Router
  ) {
    
  }
  ngOnInit(): void {
    this.router.navigate(['/procedure']).then(); 
}

}
