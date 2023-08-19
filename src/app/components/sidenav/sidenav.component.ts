import { Component, OnInit } from '@angular/core';
import { navbarData, navbarDataC } from './nav-data';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  intervalID: any;

  collaborator = false;
  isAdmin: boolean = false;
  isConnect: boolean = false;
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.intervalID = setInterval(() => {
    this.isConnect = this.loginService.isConnect();
    this.isAdmin = this.loginService.isAdmin();
    }, 1000);
    
  }

  showFiller = false;

  collapsed = false;
  navData = navbarData;
  navDataC = navbarDataC;

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }

  closeSidenav(): void {
    this.collapsed = false;
  }

}
