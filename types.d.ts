import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';

export interface BeCommittedEndUserProps {
    to: string;
}

export interface BeCommittedVirtualProps extends BeCommittedEndUserProps, MinimalProxy {
    
}

export interface BeCommittedProps{
    proxy: HTMLInputElement & BeCommittedVirtualProps;
}

export interface BeCommittedActions{
    onTo(self: this): void;
    intro(proxy: Element & BeCommittedVirtualProps, target: HTMLInputElement, beDecorProps: BeDecoratedProps): void;
}