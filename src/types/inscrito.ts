export type InscritoType = {
    id?: string
    cpf: string
    nome?: string
    telefone?: string
    email?: string
    rede?: string
    celula?: string
    novo?: boolean
    inscricao?: string
    pagamento?: Pagamento
}
export type Pagamento = {
    id: string
    codigo: string
    valor: string
    finalizado: string
    status: string
    criadoEm: string
    atualizadoEm: string
    checkout: Checkout
  }
  
  export type Checkout = {
    id: string
    url: string
    criadoEm: string
    atualizadoEm: string
  }
  