//@ts-check
/** @import {EnhancementConfig, SpawnContext, ElementEnhancementGateway} from './types/assign-gingerly/types' */;

/** @import { AllProps, Actions, PAP } from './types/be-committed/types' */


import {roundabout} from 'roundabout-lib/roundabout.js';

/**
 * @type {typeof BeCommitted & {prototype: AllProps}}
 * @implements {Actions}
 */
export class BeCommitted {
    /**
     * 
     * @param {Element & ElementEnhancementGateway} enhancedElement 
     * @param {*} ctx 
     * @param {AllProps} initVals 
     */
    constructor(enhancedElement, ctx, initVals){

    }

    /**
     * 
     * @param {AllProps} self 
     */
    async hydrate(self){
        // const {enhancedElement, on, to, nudges} = self;
        // const {parse} = await import('trans-render/dss/parse.js');
        // const specifier = await parse(to);
        // const {find} = await import('trans-render/dss/find.js');
        // const remoteEl = await find(enhancedElement, specifier);
        // if(!(remoteEl instanceof HTMLElement)) throw 404;
        // this.#clickableElementRef = new WeakRef(remoteEl);
        // enhancedElement.addEventListener(on, this);
        // if(nudges){
        //     self.nudge();
        // }
        return /** @type {PAP} */({
            resolved: true
        });
    }
}