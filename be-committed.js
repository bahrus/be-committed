//@ts-check
/** @import {ElementEnhancementGateway} from './types/assign-gingerly/types' */;
/** @import {EMC} from './types/mount-observer/types' */;
/** @import {RAConfig, RoundaboutOptions} from './types/roundabout/types' */

/** @import { AllProps, Actions, PAP, AP } from './types/be-committed/types' */

/**
 * @type {EMC<any, AllProps, Element, RAConfig<AllProps, Actions>>}
 */
import emc from './emc.json' with {type: 'json'};

const {customData} = emc;

/**
 * @implements {Actions}
 */
export class BeCommitted {
    /**
     * @this {AllProps & Actions}
     * @param {Element & ElementEnhancementGateway} enhancedElement 
     * @param {*} ctx 
     * @param {AllProps} initVals 
     */
    constructor(enhancedElement, ctx, initVals){
        this.init(this, enhancedElement, initVals);
    }
    /**
     * @param {AllProps} self 
     * @param {Element & ElementEnhancementGateway} enhancedElement 
     * @param {PAP} initVals 
     */
    async init(self, enhancedElement, initVals){
        const {defaultPropVals} = customData;
        /**
         * @type {RoundaboutOptions}
         */
        const raOptions = {
            ...customData,
            vm: self,
            initialPropVals: {
                enhancedElement,
                ...defaultPropVals,
                ...initVals
            }
        };
        (await import('roundabout-lib/roundabout.js')).roundabout(raOptions);
    }

    /**
     * @this {AllProps & Actions}
     * @param {KeyboardEvent} e 
     */
    handleEvent(e){
        if(e.key !== 'Enter') return;
        e.preventDefault();
        if(e.type !== 'keydown') return;
        const self = this;
        const {enhancedElement, to} = self;
        /** @type {HTMLElement | null} */
        let remoteEl;
        if(to){
            const rn = /** @type {Document | ShadowRoot} */ (enhancedElement.getRootNode());
            remoteEl = /** @type {HTMLElement | null} */ (rn.getElementById(to));
        } else {
            const form = /** @type {HTMLElement} */ (enhancedElement).closest('form');
            if(form === null) return;
            remoteEl = form.querySelector('button[type="submit"], input[type="submit"]');
        }
        if(remoteEl === null || !('click' in remoteEl)) throw 404;
        remoteEl.click();
    }

    /**
     * @type {AbortController | undefined}
     */
    #ac;

    /**
     * @param {AP} self 
     */
    async hydrate(self){
        if(this.#ac) this.#ac.abort();
        this.#ac= new AbortController();
        const {enhancedElement, on, nudge} = self;
        enhancedElement.addEventListener(on, this, {signal: this.#ac.signal});
        if(nudge){
            (await import('mount-observer/nudge.js')).nudge(enhancedElement);
        }
        return /** @type {PAP} */({
            resolved: true
        });
    }
}
