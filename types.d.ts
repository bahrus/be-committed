import {BeDecoratedProps, MinimalProxy, EventConfigs} from 'be-decorated/types';

export interface EndUserProps {
    to: string;
    nudge: boolean;
    on: string;
}

export interface VirtualProps extends EndUserProps, MinimalProxy {}

export type Proxy = Element & VirtualProps;

export interface ProxyProps extends VirtualProps{
    proxy: Proxy;
}

export type PP = ProxyProps;

export type PE = [Partial<PP>, EventConfigs<Proxy, Actions>];

export interface Actions{
    hydrate(pp: PP): PE;
    findTarget(pp: PP): void;
    handleCommit(pp: PP, e: KeyboardEvent): void;
}