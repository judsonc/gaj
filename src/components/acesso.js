import {refAcesso} from './firebase.js'

function Data () {
  this.criacao = Date.now()
  this.ultimaAlteracao = Date.now()
  this.criacaoReverso = Date.now() * -1
  this.ultimaAlteracaoReverso = Date.now() * -1
}

export function Acesso (passos) {
  this.data = new Data()
  // array de tamanho 6
  this.passos = passos
  this.idUser = localStorage.getItem('uid')
}

export var atualizarAcesso = function (acessoKey, acesso) {
  acesso[acessoKey].data.ultimaAlteracao = Date.now()
  acesso[acessoKey].data.ultimaAlteracaoReverso = Date.now() * -1
}

export var atualizarPasso = function (posicaoPasso) {
  const acessoString = localStorage.getItem('acesso')
  if (acessoString) {
    var acesso = JSON.parse(acessoString)
    var acessoKey = Object.keys(acesso)[0]
    if (!acesso[acessoKey].passos[posicaoPasso]) {
      acesso[acessoKey].data.ultimaAlteracao = Date.now()
      acesso[acessoKey].data.ultimaAlteracaoReverso = Date.now() * -1
      acesso[acessoKey].passos[posicaoPasso] = true
      localStorage.setItem('acesso', JSON.stringify(acesso))
      refAcesso.update(acesso)
    }
  }
}
