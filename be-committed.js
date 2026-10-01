//@ts-check
/** @import {ElementEnhancementGateway, SpawnContext} from './types/assign-gingerly/types' */;
/** @import {EMC} from './types/mount-observer/types' */;
/** @import {RAConfig, RoundaboutOptions} from './types/roundabout/types' */;
/** @import { AllProps, Actions, PAP, AP } from './types/be-committed/types' */;

/**
 * @implements {Actions}
 */
export class BeCommitted {
    /**
     * @this {AllProps & Actions}
     * @param {Element & ElementEnhancementGateway} enhancedElement
     * @param {SpawnContext} ctx
     * @param {PAP} initVals
     */
    constructor(enhancedElement, ctx, initVals){
        this.init(this, enhancedElement, ctx, initVals);
    }
    /**
     * @param {AllProps} self
     * @param {Element & ElementEnhancementGateway} enhancedElement
     * @param {SpawnContext} ctx
     * @param {PAP} initVals
     */
    async init(self, enhancedElement, ctx, initVals){
        // ctx.emc is populated by the attribute (mount-observer) spawn path;
        // programmatic spawns (enh.get()/enh.set) only supply ctx.config
        const {customData} = /** @type {EMC<any, AllProps, Element, RAConfig<AllProps, Actions>>} */ (ctx.emc || ctx.config);
        /**
         * @type {RoundaboutOptions}
         */
        const raOptions = {
            ...customData,
            vm: self,
            initialPropVals: {
                enhancedElement,
                ...customData?.defaultPropVals,
                ...initVals
            }
        };
        await (await import('roundabout-lib/roundabout.js')).roundabout(raOptions);
    }

    /**
     * @this {BeCommitted & AllProps}
     * @param {KeyboardEvent} e 
     */
    handleEvent(e){
        if(e.key !== 'Enter') return;
        e.preventDefault();
        if(e.type !== 'keydown') return;
        const self = this;
        const {enhancedElement} = self;
        const to = /** @type {string | Element | WeakRef<Element> | undefined} */ (self.to);
        /** @type {HTMLElement | null | undefined} */
        let remoteEl;
        if(to instanceof WeakRef || to instanceof Element || (to === undefined && this.#toRef !== undefined)){
            // An element passed by reference, only ever held weakly (see weakenTo).
            // roundabout's getter derefs the stored WeakRef, so a collected
            // element reads back as undefined -- that's a no-op, not an error.
            remoteEl = /** @type {HTMLElement | undefined} */ (to instanceof WeakRef ? to.deref() : to);
            if(remoteEl === undefined) return;
        } else if(to){
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
        const {enhancedElement, on} = self;
        enhancedElement.addEventListener(on, this, {signal: this.#ac.signal});
        return /** @type {PAP} */({
            resolved: true
        });
    }

    /**
     * @type {boolean | undefined}
     */
    #nudged;

    /**
     * A separate action (rather than part of hydrate), so that nudge is
     * monitored by roundabout, and setting it programmatically after
     * hydrate has run still takes effect.
     * @param {AP} self
     */
    async nudgeEnhancedElement(self){
        // nudge decrements the disabled counter, so only do it once
        if(this.#nudged) return;
        this.#nudged = true;
        (await import('assign-gingerly/handlers/nudge.js')).nudge(self.enhancedElement);
    }

    /**
     * The element this enhancement has already replaced (in to) with a WeakRef
     * @type {WeakRef<Element> | undefined}
     */
    #toRef;

    /**
     * to may be an element (or a WeakRef to one) passed by reference.  It
     * must only ever be held weakly -- including in the value stored on this
     * enhancement -- so an element is stored back as a WeakRef.  roundabout's
     * getter derefs a stored WeakRef, so reading to always yields the element;
     * #toRef remembers which element has already been weakened, so it isn't
     * weakened over and over.
     * @param {AP} self
     */
    weakenTo(self){
        const to = /** @type {string | Element | WeakRef<Element> | undefined} */ (self.to);
        if(!(to instanceof Element)){
            if(typeof to === 'string') this.#toRef = undefined;
            return;
        }
        if(this.#toRef?.deref() === to) return;
        const ref = new WeakRef(to);
        this.#toRef = ref;
        return /** @type {PAP} */ ({to: ref});
    }
}
