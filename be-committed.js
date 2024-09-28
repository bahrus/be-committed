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
        propInfo:{
            ...propInfo
        }
    }

    /**
     * 
     * @param {BAP} self 
     */
    hydrate(self){
        return /** @type {PAP} */({
        });
    }

    /**
     * 
     * @param {KeyboardEvent} e 
     */
    handleEvent(e){

    }
}

await BeCommitted.bootUp();
export {BeCommitted}
