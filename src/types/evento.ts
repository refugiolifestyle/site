import { InscritoType } from "./inscrito"

export type EventoType = {
    id: string
    titulo: string
    ativo: boolean
    logo: string
    chamada: string
    fundo: string
    valor: number
    limitePagamentos?: string
    tiposPagamentos?: string
    inscricoes?: InscritoType[]
}