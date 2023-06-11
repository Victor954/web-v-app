export type ModalRef = {
    show: () => Promise<any>;
    hide: () => void;
}