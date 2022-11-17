import {define} from 'be-decorated/DE.js';
import {BeDecoratedProps} from 'be-decorated/types.js';
import {Actions, VirtualProps, Proxy, PP, PE, ProxyProps} from './types';
import {register} from 'be-hive/register.js';

export class BeCommitted extends EventTarget implements Actions{

    #clickableElementRef: WeakRef<HTMLElement> | undefined;

    hydrate({self: of, on}: PP): PE {
        return [{resolved: true}, {handleCommit: {on, of}}]
    }

    async handleCommit(pp: PP, e: KeyboardEvent) {
        if(e.key === 'Enter'){
            if(this.#clickableElementRef === undefined || this.#clickableElementRef?.deref() == undefined){
                await this.findTarget(pp);
            }
            const clickableElement = this.#clickableElementRef?.deref();
            if(clickableElement === undefined) return;
            e.preventDefault();
            clickableElement.click();
        }
    }

    async findTarget({to, self, nudge}: PP){
        const clickableElement = (self.getRootNode() as HTMLElement).querySelector('#' + to) as HTMLButtonElement;
        if(clickableElement === null){
            console.error('404', to);
            return;
        }
        if(nudge){
            const {nudge: n} = await import('trans-render/lib/nudge.js');
            n(self);
        }

        this.#clickableElementRef = new WeakRef<HTMLElement>(clickableElement);
    }

}



const tagName = 'be-committed';
const ifWantsToBe = 'committed';
const upgrade = 'input';
define<VirtualProps & BeDecoratedProps<VirtualProps, Actions>, Actions>({
    config:{
        tagName,
        propDefaults:{
            virtualProps: ['on', 'to', 'nudge'],
            upgrade,
            ifWantsToBe,
            primaryProp: 'to',
            proxyPropDefaults:{
                nudge: true,
                on: 'keyup'
            }
        },
        actions:{
            hydrate: 'on',
            findTarget: 'to'
        }
    },
    complexPropDefaults:{
        controller: BeCommitted
    }
});
register(ifWantsToBe, upgrade, tagName);