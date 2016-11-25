function Data() {
    this.criacao = Date.now()
    this.ultimaAlteracao = Date.now()
    this.criacaoReverso = Date.now() * -1
    this.ultimaAlteracaoReverso = Date.now() * -1
}

function Acesso(passos) {
    this.data = new Data()
    // array de tamanho 6
    this.passos = passos
    this.idUser = localStorage.getItem('uid')
}

function Questionario(perguntas, titulo) {
    this.data = new Data()
    // array
    this.perguntas = perguntas
    // string
    this.titulo = titulo
}


function Pergunta(temOutraResposta, conteudo, respostas = {}) {
    // bool
    this.temOutraResposta = temOutraResposta
    // string
    this.conteudo = conteudo
    // string
    if (respostas) {
        this.tipo = 'multipla_escolha'
    } else {
        this.tipo = 'verdadeiro_ou_falso'
    }
    // array de objetos resposta
    this.respostas = respostas
}

function Restaurante(nomeFantasia, razaoSocial, cnpj, endereco, contatos) {
    // string
    this.data = new Data()
    this.nomeFantasia = nomeFantasia
    // string
    this.razaoSocial = razaoSocial
    this.cnpj = cnpj
    this.endereco = endereco
    this.contatos = contatos
}

function Endereco(cep, tipo, logradouro, numero, bairro, cidade, estado, complemento) {
    this.cep = cep
    this.tipo = tipo
    this.logradouro = logradouro
    this.numero = numero
    this.bairro = bairro
    this.cidade = cidade
    this.estado = estado
    this.complemento = complemento
}

function Contato(nome, email, telefone, cargo) {
    this.nome = nome
    this.email = email
    this.telefone = telefone
    this.cargo = cargo
}