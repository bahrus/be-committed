import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA} from './types';
import {register} from 'be-hive/register.js';

export class BeCommitted extends BE<AP, Actions> implements Actions{
    static  override get beConfig(){
        return {
            parse: true,
            primaryProp: 'to'
        } as BEConfig;
    }

    #clickableElementRef: WeakRef<HTMLElement> | undefined;

    hydrate(self: this): POA {
        const {enhancedElement, on} = self
        return [{resolved: true} as PAP, {handleCommit: {on, of: enhancedElement}}];
    }

    async findTarget(self: this){
        const {enhancedElement, to, nudge} = self;
        const clickableElement = (enhancedElement.getRootNode() as HTMLElement).querySelector('#' + to) as HTMLButtonElement;
        if(clickableElement === null){
            console.error('404', to);
            return;
        }
        if(nudge){
            const {nudge: n} = await import('trans-render/lib/nudge.js');
            n(enhancedElement);
        }

        this.#clickableElementRef = new WeakRef<HTMLElement>(clickableElement);
    }

    async handleCommit(self: this, e: KeyboardEvent){
        if(e.key === 'Enter'){
            const {enhancedElement} = self;
            if(this.#clickableElementRef === undefined || this.#clickableElementRef?.deref() == undefined){
                await this.findTarget(self);
            }
            const clickableElement = this.#clickableElementRef?.deref();
            if(clickableElement === undefined) return;
            e.preventDefault();
            clickableElement.click();
        }
    }
}

export interface BeCommitted extends AllProps{}

const tagName = 'be-committed';
const ifWantsToBe = 'committed';
const upgrade = '*';

const xe = new XE<AP, Actions>({
    config: {
        tagName,
        propDefaults: {
            ...propDefaults,
            nudge: true,
            on: 'keyup'
        },
        propInfo: {
            ...propInfo
        },
        actions: {
            hydrate: 'on',
            findTarget: 'to'
        }
    },
    superclass: BeCommitted
});

register(ifWantsToBe, upgrade, tagName);