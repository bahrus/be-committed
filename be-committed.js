import { define } from 'be-decorated/DE.js';
import { register } from 'be-hive/register.js';
export class BeCommitted extends EventTarget {
    #clickableElementRef;
    hydrate({ self: of, on }) {
        return [{ resolved: true }, { handleCommit: { on, of } }];
    }
    handleCommit(pp, e) {
        if (e.key === 'Enter') {
            const clickableElement = this.#clickableElementRef?.deref();
            if (clickableElement === undefined)
                return;
            e.preventDefault();
            clickableElement.click();
        }
    }
    async findTarget({ to, self, nudge }) {
        const clickableElement = self.getRootNode().querySelector('#' + to);
        if (clickableElement === null) {
            console.error('Unable to locate target');
            return;
        }
        if (nudge) {
            const { nudge: n } = await import('trans-render/lib/nudge.js');
            n(self);
        }
        this.#clickableElementRef = new WeakRef(clickableElement);
    }
}
const tagName = 'be-committed';
const ifWantsToBe = 'committed';
const upgrade = 'input';
define({
    config: {
        tagName,
        propDefaults: {
            virtualProps: ['on', 'to', 'nudge'],
            upgrade,
            ifWantsToBe,
            primaryProp: 'to',
            proxyPropDefaults: {
                nudge: true,
                on: 'keyup'
            }
        },
        actions: {
            hydrate: 'on',
            findTarget: 'to'
        }
    },
    complexPropDefaults: {
        controller: BeCommitted
    }
});
register(ifWantsToBe, upgrade, tagName);
