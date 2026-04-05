//@ts-check
/** @import {EnhancementConfig, SpawnContext, ElementEnhancementGateway} from './types/assign-gingerly/types' */;
/** @import {EMC} from './types/mount-observer/types' */;
/** @import {RAConfig, RoundaboutOptions} from './types/roundabout/types' */

/** @import { AllProps, Actions, PAP } from './types/be-committed/types' */

/**
 * @type {EMC<any, AllProps, Element, RAConfig<AllProps, Actions>>}
 */
import emc from './emc.mjs' with {type: 'json'};

import {roundabout} from 'roundabout-lib/roundabout.js';
import {assignGingerly} from 'assign-gingerly/assignGingerly.js';

/**
 * @type {typeof BeCommitted & AllProps & {prototype: AllProps}}
 * @implements {Actions}
 */
export class BeCommitted {
    /**
     * @type {WeakRef<Element & ElementEnhancementGateway>}
     */
    #enhancedElementRef;
    get enhancedElement(){
        const ref = this.#enhancedElementRef.deref();
        if(ref === undefined) throw 404;
        return ref;
    }
    /**
     * 
     * @param {Element & ElementEnhancementGateway} enhancedElement 
     * @param {*} ctx 
     * @param {AllProps} initVals 
     */
    constructor(enhancedElement, ctx, initVals){
        this.#enhancedElementRef = new WeakRef(enhancedElement)
        this.init(this, initVals);
    }
    /**
     * @param {AllProps} self 
     * @param {PAP} initVals 
     */
    async init(self, initVals){
        const {customData} = emc;
        /**
         * @type {RoundaboutOptions}
         */
        const raOptions = {
            ...customData,
            vm: this,
        };
        await roundabout(raOptions);
        assignGingerly(self, {
            on: 'keyup',
            ...initVals
        });
    }

    /**
     * 
     * @param {KeyboardEvent} e 
     */
    handleEvent(e){
        if(e.key !== 'Enter') return;
        const self = /** @type {AllProps} */ (/** @type {unknown} */ (this));
        const {enhancedElement, on, to, nudges} = self;
        const rn = /** @type {Document | ShadowRoot} */ (enhancedElement.getRootNode());
        const remoteEl = rn.getElementById(to);
        if(remoteEl === null || !('click' in remoteEl)) throw 404;
        e.preventDefault();
        remoteEl.click();
    }

    /**
     * @type {AbortController | undefined}
     */
    #ac;

    /**
     * 
     * @param {AllProps} self 
     */
    async hydrate(self){
        if(this.#ac) this.#ac.abort();
        this.#ac= new AbortController();
        const {enhancedElement, on, to, nudges} = self;
        enhancedElement.addEventListener(on, this);
        if(nudges){
            //self.nudge();
        }
        return /** @type {PAP} */({
            resolved: true
        });
    }
}