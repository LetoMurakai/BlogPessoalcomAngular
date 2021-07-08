import { AuthService } from './../service/auth.service';
import { Usuario } from './../model/Usuario';
import { TemaService } from './../service/tema.service';
import { PostagemService } from './../service/postagem.service';
import { Postagem } from './../model/Postagem';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem
  listaTemas: Tema[]
  listaPostagem: Postagem[]
  tema: Tema = new Tema
  idTema: number

  user: Usuario = new Usuario
  idUser = environment.id

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService
  ) { }

  ngOnInit(){

    window.scroll(0,0)

    if(environment.token == ''){
      alert('Pareçe que sua sessão expirou, faça login novamente! :D')
      this.router.navigate(['/login'])
    }

    this.getAllTema()
    this.getAllPostagem()
  }

  getAllTema(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) =>{
      this.tema = resp
    })
  }

  getAllPostagem(){
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[]) =>{
      this.listaPostagem = resp
    })
  }

  findByIdUser(){
    this.postagemService.getByIdUser(this.idUser).subscribe((resp: Usuario) => {
      this.user = resp
    })
  }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.usuario = this.user

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      alert('Postagem feita com sucesso! :)')
      this.postagem = new Postagem()
      this.getAllPostagem()
    })
  }

}
