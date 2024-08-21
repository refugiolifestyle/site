import useFirebase from '@/configs/firebase';
import { getDownloadURL, listAll, ref } from 'firebase/storage';

export type FooterGalleryGET = {
  fotos: string[]
}
 
export async function GET() {
  const { storage } = useFirebase()
  
  let fotos = []
  let { items } = await listAll(ref(storage, 'site/galeria'));

  for (let item of items) {
      fotos.push(
          await getDownloadURL(ref(storage, item.fullPath)))
  }
  
  return Response.json({ fotos })
}