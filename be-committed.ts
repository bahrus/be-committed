import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeCommittedProps, BeCommittedActions} from './types';
import {nudge} from 'trans-render/lib/nudge.js';
import {register} from 'be-hive/register.js';

export class BeCommittedController{
    clickableElementRef: WeakRef<HTMLElement> | undefined;
    intro(self: any, inp: HTMLInputElement){
        inp.addEventListener('keyup', this.handleKeyup);

    }

    onTo({to}: this){
        const clickableElement = (this.proxy.getRootNode() as HTMLElement).querySelector('#' + to) as HTMLButtonElement;
        if(clickableElement === null){
            console.error('Unable to locate target');
            return;
        }
        nudge(this.proxy);
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

export interface BeCommittedController extends BeCommittedProps{}
const tagName = 'be-committed';
const ifWantsToBe = 'committed';
const upgrade = 'input';
define<BeCommittedProps & BeDecoratedProps, BeCommittedActions>({
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
        controller: BeCommittedController
    }
});
register(ifWantsToBe, upgrade, tagName);