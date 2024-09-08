import {
    Dialog,
    DialogClose,
    DialogContent
} from "@/components/ui/dialog";

export function PagamentoModal({ url }: { url?: string }) {
    return <Dialog open={!!url} modal={true}>
        <DialogContent
            closable={false}
            className="w-full max-w-[900px] h-5/6 my-2 p-0"
            onInteractOutside={(e) => {
                e.preventDefault();
            }}>
            <iframe src={url} className="w-full h-full rounded"></iframe>
        </DialogContent>
    </Dialog>
}