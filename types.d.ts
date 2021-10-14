export interface BeCommittedProps{
    to: string;
    proxy: HTMLInputElement;
}

export interface BeCommittedActions{
    onTo(self: this): void;
}