//@ts-check

/** @import {EMC} from './types/mount-observer/types' */;
/** @import {AllProps, Acions} from './types/be-committed/types' */
/** @import {RAConfig} from './types/roundabout/types' */

/**
 * @type {EMC<any, AllProps, Element, RAConfig<AllProps, Actions> >}
 */
export const emc = {
    enhConfig: {
        enhKey: 'BeCommitted',
        spawn: 'be-committed/be-committed.js',
        withAttrs: {
            base: 'be-committed',
            to: '${base}-to',
            nudges: '${base}-nudges',
            _nudges:{
                instanceOf: 'Boolean'
            }
        }
    },
    customData: {
        compacts:{
            when_on_changes_call_hydrate: 0,
        },
    }
}

export function render(){
    return JSON.stringify(emc, null, 4);
}