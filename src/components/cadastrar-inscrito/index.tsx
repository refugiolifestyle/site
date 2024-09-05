"use client"

import { Dispatch, SetStateAction, useState } from "react"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { EventoType } from "@/types/evento"
import { InscritoType } from "@/types/inscrito"
import FormularioTabsContent from "@/components/cadastrar-inscrito/formulario"
import PagamentoTabsContent from "@/components/cadastrar-inscrito/pagamento"
import FinalizadoTabsContent from "@/components/cadastrar-inscrito/finalizado"

type CadastrarInscritoProps = {
  evento: EventoType,
}

export type CadastrarInscritoContentProps = {
  evento: EventoType,
  inscrito?: InscritoType,
  setInscrito: Dispatch<SetStateAction<InscritoType | undefined>>,
  setTabActive: Dispatch<SetStateAction<CadastrarInscritoTabsType>>
}

export type CadastrarInscritoTabsType = "formulario" | "pagamento" | "finalizado"

export default function CadastrarInscrito({ evento }: CadastrarInscritoProps) {
  const [tabActive, setTabActive] = useState<CadastrarInscritoTabsType>("formulario")
  const [inscrito, setInscrito] = useState<InscritoType>()

  return (
    <Tabs value={tabActive}>
      <TabsList className="grid grid-cols-3 bg-transparent text-gray-400">
        <TabsTrigger value="formulario">Formulário</TabsTrigger>
        <TabsTrigger value="pagamento">Pagamento</TabsTrigger>
        <TabsTrigger value="finalizado">Finalizado</TabsTrigger>
      </TabsList>
      <FormularioTabsContent evento={evento} setTabActive={setTabActive} setInscrito={setInscrito} inscrito={inscrito} />
      <PagamentoTabsContent evento={evento} setTabActive={setTabActive} setInscrito={setInscrito} inscrito={inscrito} />
      <FinalizadoTabsContent evento={evento} setTabActive={setTabActive} setInscrito={setInscrito} inscrito={inscrito} />
    </Tabs>
  )
}
