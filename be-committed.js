// @ts-check
import { BE } from 'be-enhanced/BE.js';
import { propInfo, resolved, rejected } from 'be-enhanced/cc.js';

/** @import {BEConfig, IEnhancement, BEAllProps} from './ts-refs/be-enhanced/types.d.ts' */
/** @import {Actions, PAP, AP, BAP, ObservingParameters} from './ts-refs/be-committed/types' */

/**
 * @implements {Actions}
 * @implements {EventListenerObject}
 */
class BeCommitted extends BE {
    /**
     * @type {BEConfig<BAP, Actions & IEnhancement, any>}
     */
    static config = {
        propDefaults:{
            on: 'input'
        },
        propInfo:{
            ...propInfo,
            to: {},
            nudges: {},
        },
        compacts:{
            when_on_changes_invoke_hydrate: 0,
        },

        actions:{
            
        },
        positractions: [
            resolved, rejected
        ]
    }

    /**
     * @type {WeakRef<HTMLElement> | undefined}
     */
    #clickableElementRef;

    /**
     * 
     * @param {BAP} self 
     */
    async hydrate(self){
        const {enhancedElement, on, to, nudges} = self;
        const {parse} = await import('trans-render/dss/parse.js');
        const specifier = await parse(to);
        const {find} = await import('trans-render/dss/find.js');
        const remoteEl = await find(enhancedElement, specifier);
        if(!(remoteEl instanceof HTMLElement)) throw 404;
        this.#clickableElementRef = new WeakRef(remoteEl);
        enhancedElement.addEventListener(on, this);
        if(nudges){
            self.nudge();
        }
        return /** @type {PAP} */({
        });
    }

    /**
     * 
     * @param {KeyboardEvent} e 
     */
    handleEvent(e){
        if(e.key !== 'Enter') return;
        const clickableElementRef = this.#clickableElementRef?.deref();
        if(clickableElementRef === undefined) throw 404;
        e.preventDefault();
        clickableElementRef.click();
    }
}

await BeCommitted.bootUp();
export {BeCommitted}
