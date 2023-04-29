import { ActionOnEventConfigs } from "trans-render/froop/types";
import {IBE} from 'be-enhanced/types';

export interface EndUserProps extends IBE{
    to: string;
    nudge: boolean;
    on: string;
}

export interface AllProps extends EndUserProps {}

export type AP = AllProps;

export type PAP = Partial<AP>;

export type ProPAP = Promise<PAP>;

export type POA = [PAP | undefined, ActionOnEventConfigs<PAP, Actions>]


export interface Actions{
    hydrate(self: this): POA;
    findTarget(self: this): Promise<void>;
    handleCommit(self: this, e: KeyboardEvent): Promise<void>;
}