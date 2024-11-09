import { EventoPagamentosType, EventoTermoType } from "./evento"

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
  finalizada?: boolean
  inscritoEm?: string
  pagamentos?: {[txid: string]: Pagamento}
  pagamentosAFazer?: EventoPagamentosType[]
  termos?: EventoTermoType[]
}

export type Pagamento = {
  parcelas: EventoPagamentosType[]
  tipo?: string
  txid?: string
  codigo?: string
  valor?: string
  status?: string
  criadoEm?: string
  pagoEm?: string
  expiraEm?: string
  url?: string
  pixID?: string
  notificationId?: string
}