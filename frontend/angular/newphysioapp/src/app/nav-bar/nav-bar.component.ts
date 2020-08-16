import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loggedinUser:string='';


  constructor(private alertifyService:AlertifyService) { }

  ngOnInit() {
  }

  loggedin(){
    this.loggedinUser= localStorage.getItem('token') || '';
    return this.loggedinUser;
  }
  onLogout(){
    localStorage.removeItem('token');
    this.alertifyService.success("You are logged out");
  }


  items: string[] = [
    'View Dashboard','My Prodile','Change Password', 'Logout'
  ];


  onHidden(): void {
    console.log('Dropdown is hidden');
  }
  onShown(): void {
    console.log('Dropdown is shown');
  }
  isOpenChange(): void {
    console.log('Dropdown state is changed');
  }
}
