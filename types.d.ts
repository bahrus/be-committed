import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';

export interface EndUserProps {
    to: string;
}

export interface VirtualProps extends EndUserProps, MinimalProxy {}

export type Proxy = Element & VirtualProps;

export interface ProxyProps extends VirtualProps{
    proxy: Proxy
}

export type PP = ProxyProps;


export interface Actions{
    onTo(pp: PP): void;
    intro(proxy: Proxy, target: HTMLInputElement, beDecorProps: BeDecoratedProps): void;
}