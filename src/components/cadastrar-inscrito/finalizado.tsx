import { CadastrarInscritoContentProps } from "@/components/cadastrar-inscrito";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { CheckCircle, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export default function FinalizadoTabsContent({ evento, setInscrito, setTabActive, voltarInicio }: CadastrarInscritoContentProps) {

    function novaInscricao() {
        setInscrito(undefined)
        setTabActive("formulario")
    }

    return <TabsContent value="finalizado">
        <Card className="w-[350px]">
            <CardHeader>
                <div className="flex flex-row space-x-4">
                    <CheckCircle size={42} className="text-green-600" />
                    <div className="flex-1">
                        <CardTitle>Finalizado</CardTitle>
                        <CardDescription>Pagamento realizado</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 text-justify">
                Sua inscrição para o evento <b>{evento.titulo}</b> foi concluida com sucesso, aguarde o grande dia para realizar seu credenciamento e viver tudo o que Deus tem preparado para você.
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <Button
                    onClick={voltarInicio}
                    className="w-full gap-2 text-white bg-gradient-to-r from-[#ad1a1c] to-[#830b0c]">
                    <Plus />
                    Nova inscrição
                </Button>
            </CardFooter>
        </Card>
    </TabsContent>
}