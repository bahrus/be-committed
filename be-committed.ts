import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeCommittedProps, BeCommittedActions, BeCommittedVirtualProps, Proxy, PP} from './types';
import {nudge} from 'trans-render/lib/nudge.js';
import {register} from 'be-hive/register.js';

export class BeCommitted extends EventTarget implements BeCommittedActions{

    clickableElementRef: WeakRef<HTMLElement> | undefined;
    intro(proxy: Proxy, target: HTMLInputElement, beDecorProps: BeDecoratedProps){
        target.addEventListener('keyup', this.handleKeyup);
        proxy.resolved = true;
    }

    onTo({to, proxy}: PP){
        const clickableElement = (proxy.getRootNode() as HTMLElement).querySelector('#' + to) as HTMLButtonElement;
        if(clickableElement === null){
            console.error('Unable to locate target');
            return;
        }
        nudge(proxy);
        this.clickableElementRef = new WeakRef<HTMLElement>(clickableElement);
    }

    handleKeyup = (e: KeyboardEvent) => {
        if(e.key === 'Enter'){
            const clickableElement = this.clickableElementRef?.deref();
            if(clickableElement === undefined) return;
            e.preventDefault();
            clickableElement.click();
        }
    }
}



const tagName = 'be-committed';
const ifWantsToBe = 'committed';
const upgrade = 'input';
define<BeCommittedVirtualProps & BeDecoratedProps<BeCommittedVirtualProps, BeCommittedActions>, BeCommittedActions>({
    config:{
        tagName,
        propDefaults:{
            virtualProps: ['to'],
            upgrade,
            ifWantsToBe,
            intro: 'intro',
            primaryProp: 'to'
        },
        actions:{
            'onTo':{
                ifAllOf: ['to']
            }
        }
    },
    complexPropDefaults:{
        controller: BeCommitted
    }
});
register(ifWantsToBe, upgrade, tagName);