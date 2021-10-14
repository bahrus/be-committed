export interface BeCommittedProps{
    to: string;
}

export interface BeCommittedActions{
    onTo(self: this): void;
}