// @ts-check
import { BeHive, seed, MountObserver } from 'be-hive/be-hive.js';
/** @import {EMC, EventListenerOrFn} from './ts-refs/trans-render/be/types' */
/** @import {Actions, PAP,  AP} from './ts-refs/be-committed/types' */;

/**
 * @type {Partial<EMC<any, AP>>}
 */
export const emc = {
    base: 'be-committed',
    branches: ['', 'to', 'nudges'],
    map: {
        '0.0': {
            instanceOf: 'Object',
            mapsTo: '.'
        },
        '1.0': {
            instanceOf: 'String',
            mapsTo: 'to'
        },
        '2.0': {
            instanceOf: 'Boolean',
            mapsTo: 'nudges'
        }
    },
    enhPropKey: 'beCommitted',
    importEnh: async () => {
        const {BeCommitted} = await import('./be-committed.js');
        return BeCommitted;
    },
};

const mose = seed(emc);
MountObserver.synthesize(document, BeHive, mose);