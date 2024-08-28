/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
// import * as logger from "firebase-functions/logger";
import {onRequest} from "firebase-functions/v2/https";

import {initializeApp} from "firebase-admin/app";
import {getStorage, getDownloadURL} from "firebase-admin/storage";
import {getDatabase} from "firebase-admin/database";

initializeApp();

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const fotosGaleria = onRequest(async (request, response) => {
  const fotos = await getStorage()
    .bucket("gs://refugio-89c1e.appspot.com")
    .getFiles({
      prefix: "site/galeria",
      autoPaginate: false,
    })
    .then(([files]) => files
      .slice(1)
      .map((file) => getDownloadURL(file))
    );

  response.json({fotos: await Promise.all(fotos)});
});

type EventoType = {
  id: string
  titulo: string
  ativo: boolean
  logo: string
  chamada: string
  fundo: string
  inscritos?: any[]
}

export const getEventos = onRequest(async (request, response) => {
  const snapshot = await getDatabase()
    .ref("eventos")
    .get();

  const bucket = getStorage()
    .bucket("gs://refugio-89c1e.appspot.com");

  const eventos: EventoType[] = [];
  const values = Object.values<EventoType>(snapshot.val());

  for (const evento of values) {
    if (!evento.ativo) {
      continue;
    }

    const chamada = bucket.file(`site/eventos/${evento.id}/chamada.mp4`);
    const fundo = bucket.file(`site/eventos/${evento.id}/fundo.jpg`);
    const logo = bucket.file(`site/eventos/${evento.id}/logo.png`);

    eventos.push({
      ...evento,
      chamada: await getDownloadURL(chamada),
      fundo: await getDownloadURL(fundo),
      logo: await getDownloadURL(logo),
    });
  }

  response.json({eventos});
});
