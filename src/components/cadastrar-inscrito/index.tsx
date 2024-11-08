"use client"

import { EventoType } from "@/types/evento"
import { InscritoType } from "@/types/inscrito"
import { Dispatch, SetStateAction, useState } from "react"
import Fechada from "./fechada"
import Finalizacao from "./steps/finalizacao"
import Validacao from "./steps/validacao"
import Pagamentos from "./steps/pagamento"
import Parcelas from "./steps/parcelas"
import Termos from "./steps/termos"
import Formulario from "./steps/formulario"
import FinalizacaoMoney from "./steps/finalizacao-money"
import { toJpeg } from 'html-to-image';

type CadastrarInscritoProps = {
  evento: EventoType,
}

export type StepProps = {
  step: number
  evento: EventoType
  inscrito?: InscritoType
  setStep: Dispatch<SetStateAction<number>>
  setInscrito: Dispatch<SetStateAction<InscritoType | undefined>>
  reset: () => void
  share: () => Promise<void>
}

export const Steps = {
  "VALIDACAO": 1,
  "FORMULARIO": 2,
  "TERMOS": 3,
  "PARCELAS": 4,
  "PAGAMENTO": 5,
  "FINALIZACAO": 6,
  "FINALIZACAO_MONEY": 7
}

export default function CadastrarInscrito({ evento }: CadastrarInscritoProps) {
  const [inscrito, setInscrito] = useState<InscritoType>()
  const [step, setStep] = useState<number>(Steps.VALIDACAO)

  const reset = () => {
    setStep(Steps.VALIDACAO)
    setInscrito(undefined)
  }

  const share = async () => {
    const jpeg = await toJpeg(document.getElementById('card-inscricao-geral')!, {
      width: 450,
      canvasWidth: 400,
      type: "image/jpeg",
      quality: 1
    })
    
    const file = new File([jpeg], `${evento.titulo} - Confirmação.jpg`, {type: 'image/jpeg'});
    console.log(jpeg, file)

    const data = {
      files: [file!],
      title: evento.titulo,
      text: "Inscrição finalizada",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/eventos/${evento.id}`
    };

    try {
      if (!(navigator.canShare(data))) {
        throw new Error("Não foi possivel compartilhar.");
      }

      await navigator.share(data);
    } catch (err) {
      console.error(err)
    }
  }

  if (!evento || !evento.inscricoesAbertas) {
    return <Fechada evento={evento} />
  }

  return <div id="card-inscricao-geral" className="w-full max-w-[450px]">
    {
      step === Steps.VALIDACAO && <Validacao evento={evento} step={step} inscrito={inscrito} setStep={setStep} setInscrito={setInscrito} reset={reset} share={share} />
      || step === Steps.FORMULARIO && <Formulario evento={evento} step={step} inscrito={inscrito} setStep={setStep} setInscrito={setInscrito} reset={reset} share={share} />
      || step === Steps.TERMOS && <Termos evento={evento} step={step} inscrito={inscrito} setStep={setStep} setInscrito={setInscrito} reset={reset} share={share} />
      || step === Steps.PARCELAS && <Parcelas evento={evento} step={step} inscrito={inscrito} setStep={setStep} setInscrito={setInscrito} reset={reset} share={share} />
      || step === Steps.PAGAMENTO && <Pagamentos evento={evento} step={step} inscrito={inscrito} setStep={setStep} setInscrito={setInscrito} reset={reset} share={share} />
      || step === Steps.FINALIZACAO && <Finalizacao evento={evento} step={step} inscrito={inscrito} setStep={setStep} setInscrito={setInscrito} reset={reset} share={share} />
      || step === Steps.FINALIZACAO_MONEY && <FinalizacaoMoney evento={evento} step={step} inscrito={inscrito} setStep={setStep} setInscrito={setInscrito} reset={reset} share={share} />
    }
  </div>
}
