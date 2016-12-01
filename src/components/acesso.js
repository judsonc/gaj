function Data() {
    this.criacao = Date.now()
    this.ultimaAlteracao = Date.now()
    this.criacaoReverso = Date.now() * -1
    this.ultimaAlteracaoReverso = Date.now() * -1
}

export function Acesso(passos) {
    this.data = new Data()
    // array de tamanho 6
    this.passos = passos
    this.idUser = localStorage.getItem('uid')
}
export var atualizarAcesso = function(acessoKey, acesso) {
    acesso[acessoKey].data.ultimaAlteracao = Date.now()
    acesso[acessoKey].data.ultimaAlteracaoReverso = Date.now() * -1
}

// // Para criar um novo acesso
// refAcesso.push(acesso)

// // Para atualziado
// refIdAcesso.update(acesso)
