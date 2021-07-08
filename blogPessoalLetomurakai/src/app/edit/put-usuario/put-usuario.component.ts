import { PostagemService } from 'src/app/service/postagem.service';
import { environment } from './../../../environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { Usuario } from './../../model/Usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-put-usuario',
  templateUrl: './put-usuario.component.html',
  styleUrls: ['./put-usuario.component.css']
})
export class PutUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario() 
  idUser:number
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(){
    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/login'])
    }

    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)
  }

  confirmSenha(event: any){
    this.confirmarSenha = event.target.value
  }

  atualizar(){
    this.usuario.tipo = this.tipoUsuario

    if(this.usuario.senha != this.confirmarSenha){
      alert('A senhas estão incorretas.')
    }else{
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario)=> {
        this.usuario = resp
        this.router.navigate(['/login'])
        alert('Usuário atualizado com sucesso. Faça o login novamente!')
        environment.token = ''
        environment.nome = ''
        environment.foto = ''
        environment.id = 0
      })
    }
  }

  findByIdUser(id:number){
    this.authService.getByIdUser(id).subscribe((resp: Usuario) =>{
      this.usuario= resp
    })
  }
}
