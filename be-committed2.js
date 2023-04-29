import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
import { register } from 'be-hive/register.js';
export class BeCommitted extends BE {
    static get beConfig() {
        return {
            parse: true,
            primaryProp: 'to'
        };
    }
    #clickableElementRef;
    hydrate(self) {
        const { enhancedElement, on } = self;
        return [{ resolved: true }, { handleCommit: { on, of: enhancedElement } }];
    }
    async findTarget(self) {
        const { enhancedElement, to, nudge } = self;
        const clickableElement = enhancedElement.getRootNode().querySelector('#' + to);
        if (clickableElement === null) {
            console.error('404', to);
            return;
        }
        if (nudge) {
            const { nudge: n } = await import('trans-render/lib/nudge.js');
            n(enhancedElement);
        }
        this.#clickableElementRef = new WeakRef(clickableElement);
    }
    async handleCommit(self, e) {
        if (e.key === 'Enter') {
            const { enhancedElement } = self;
            if (this.#clickableElementRef === undefined || this.#clickableElementRef?.deref() == undefined) {
                await this.findTarget(self);
            }
            const clickableElement = this.#clickableElementRef?.deref();
            if (clickableElement === undefined)
                return;
            e.preventDefault();
            clickableElement.click();
        }
    }
}
const tagName = 'be-committed';
const ifWantsToBe = 'committed';
const upgrade = '*';
const xe = new XE({
    config: {
        tagName,
        propDefaults: {
            ...propDefaults,
            nudge: true,
            on: 'keyup'
        },
        propInfo: {
            ...propInfo
        },
        actions: {
            hydrate: 'on',
            findTarget: 'to'
        }
    },
    superclass: BeCommitted
});
register(ifWantsToBe, upgrade, tagName);
