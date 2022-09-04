import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';

export interface BeCommittedEndUserProps {
    to: string;
}

export interface BeCommittedVirtualProps extends BeCommittedEndUserProps, MinimalProxy {}

export type Proxy = Element & BeCommittedVirtualProps;

export interface ProxyProps extends BeCommittedVirtualProps{
    proxy: Proxy
}

export type PP = ProxyProps;

export interface BeCommittedProps{
    proxy: HTMLInputElement & BeCommittedVirtualProps;
}

export interface BeCommittedActions{
    onTo(pp: PP): void;
    intro(proxy: Proxy, target: HTMLInputElement, beDecorProps: BeDecoratedProps): void;
}