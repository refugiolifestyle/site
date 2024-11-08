import { InscritoType } from "./inscrito"

export type EventoType = {
    id: string
    titulo: string
    subtitulo: string
    ativo: boolean
    logo: string
    chamada: string | null
    flyer: string | null
    fundo: string
    valor: number
    limitePagamentos: string
    tiposPagamentos: string
    inscricoes?: InscritoType[]
    pagamentos: EventoPagamentosType[]
    inscricoesAbertas: boolean
    meta?: number
    metaBatida?: Object
    termos: EventoTermoType[]
}

export type EventoTermoType = {
    termo: number
    descricao: string
    assinado?: boolean
}

export type EventoPagamentosType = {
    parcela: number
    nome: string
    valores: {
        pix: number
        credit_card: number
        money: number
    }
  }