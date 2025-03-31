interface CreateUser {
    nome: string,
    email: string,
    senha: string,
    confirmarSenha: string,
    telefone: string,
}

interface LoginUser {
    email: string,
    senha?: string,
}

interface ResultUser {
    id: number,
    nome: string,
    email: string,
    senha: string,
    telefone: string,
    data_criacao: Date,
    active: boolean
  }

export {
    CreateUser,
    LoginUser,
    ResultUser
};