//@ts-check

/** @import {EMC} from './types/mount-observer/types' */;
/** @import {AllProps, Actions} from './types/be-committed/types' */
/** @import {RAConfig} from './types/roundabout/types' */

/**
 * @type {EMC<any, AllProps, Element, RAConfig<AllProps, Actions> >}
 */
export const emc = {
    enhConfig: {
        enhKey: 'beCommitted',
        spawn: 'be-committed/be-committed.js',
        withAttrs: {
            base: 'be-committed',
            to: '${base}-to',
            nudge: '${base}-nudge',
            _nudge:{
                instanceOf: 'Boolean'
            }
        }
    },
    customData: {
        actions:{
            hydrate: {
                ifAllOf: ['on', 'enhancedElement']
            }
        },
        compacts:{
            when_resolved_changes_dispatch: 'resolved',
        },
        weakRef: {
            properties: ['enhancedElement']
        },
        defaultPropVals: {
            on: 'keydown'
        }
    }
}

export function render(){
    return JSON.stringify(emc, null, 4);
}

console.log(render());