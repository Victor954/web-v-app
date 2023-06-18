import { Ref } from "vue";

export type PopoverRef = {
    containerHasReady: Ref<boolean>,
    show: (element: HTMLElement) => void;
    update: () => void,
    dispose: () => void;
}

export type PopoverManager = {
    popupId: Ref<string>;
}