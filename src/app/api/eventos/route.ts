import useFirebase from '@/configs/firebase';
import * as FBStorage from 'firebase/storage';
import * as FBDatabase from 'firebase/database';

export type EventoType = {
  id: string
  titulo: string
  ativo: boolean
  logo: string
  chamada: string
  fundo: string
  inscritos?: any[]
}

export async function GET() {
  const { storage, database } = useFirebase()

  let eventos: EventoType[] = []

  const snapshot = await FBDatabase.get(FBDatabase.ref(database, 'eventos'))
  const values = Object.values<EventoType>(snapshot.val())
 
  for (let evento of values) {
    if (!evento.ativo) {
      continue
    }

    let fundo = await FBStorage.getDownloadURL(FBStorage.ref(storage, `site/eventos/${evento.id}/fundo.jpg`))
    let logo = await FBStorage.getDownloadURL(FBStorage.ref(storage, `site/eventos/${evento.id}/logo.png`))
    let chamada = await FBStorage.getDownloadURL(FBStorage.ref(storage, `site/eventos/${evento.id}/chamada.mp4`))

    eventos.push({
      ...evento,
      fundo,
      logo,
      chamada
    })
  }

  return Response.json({ eventos })
}