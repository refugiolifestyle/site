import useFirebase from '@/configs/firebase';
import * as FBStorage from 'firebase/storage';
import * as FBDatabase from 'firebase/database';
import { NextRequest } from 'next/server';
import { EventoType } from '@/app/api/eventos/route';

type GETRouteProps = {
  params: {
    id: string
  }
}

export async function GET(req: NextRequest, { params }: GETRouteProps) {
  const { storage, database } = useFirebase()

  const snapshot = await FBDatabase.get(FBDatabase.ref(database, `eventos/${params.id}`))
  const snap = snapshot.val() as EventoType

  let fundo = await FBStorage.getDownloadURL(FBStorage.ref(storage, `site/eventos/${snap.id}/fundo.jpg`))
  let logo = await FBStorage.getDownloadURL(FBStorage.ref(storage, `site/eventos/${snap.id}/logo.png`))

  return Response.json({
    evento: {
      ...snap,
      fundo,
      logo
    }
  })
}