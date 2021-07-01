import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(){

    if(environment.token == ''){
      alert('Pareçe que sua sessão expirou, faça login novamente! :D')
      this.router.navigate(['/login'])
    }

  }

}
