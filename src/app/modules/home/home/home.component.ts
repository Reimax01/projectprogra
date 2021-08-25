import { UserService } from '@services/common/user.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '@models/Usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }


}
