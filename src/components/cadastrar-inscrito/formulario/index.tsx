"use client"

import { CadastrarInscritoContentProps } from "@/components/cadastrar-inscrito"
import { TabsContent } from "@/components/ui/tabs"
import CadastroFormularioCadastro from "@/components/cadastrar-inscrito/formulario/cadastro"
import ValidacaoFormularioCadastro from "@/components/cadastrar-inscrito/formulario/validacao"

export default function FormularioCadastrarInscrito({ evento, voltarInicio, setTabActive, inscrito, setInscrito }: CadastrarInscritoContentProps) {
    return (
        <TabsContent value="formulario">
            {
                inscrito === undefined
                    ? <ValidacaoFormularioCadastro evento={evento} voltarInicio={voltarInicio} setTabActive={setTabActive} setInscrito={setInscrito} inscrito={inscrito} />
                    : <CadastroFormularioCadastro evento={evento} voltarInicio={voltarInicio} setTabActive={setTabActive} setInscrito={setInscrito} inscrito={inscrito} />
            }
        </TabsContent>
    )
}
