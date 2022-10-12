import { define } from 'be-decorated/DE.js';
import { register } from 'be-hive/register.js';
export class BeCommitted extends EventTarget {
    clickableElementRef;
    intro(proxy, target, beDecorProps) {
        target.addEventListener('keyup', this.handleKeyup);
        proxy.resolved = true;
    }
    async onTo({ to, proxy, nudge: n }) {
        const clickableElement = proxy.getRootNode().querySelector('#' + to);
        if (clickableElement === null) {
            console.error('Unable to locate target');
            return;
        }
        if (n) {
            const { nudge } = await import('trans-render/lib/nudge.js');
            nudge(proxy);
        }
        this.clickableElementRef = new WeakRef(clickableElement);
    }
    handleKeyup = (e) => {
        if (e.key === 'Enter') {
            const clickableElement = this.clickableElementRef?.deref();
            if (clickableElement === undefined)
                return;
            e.preventDefault();
            clickableElement.click();
        }
    };
}
const tagName = 'be-committed';
const ifWantsToBe = 'committed';
const upgrade = 'input';
define({
    config: {
        tagName,
        propDefaults: {
            virtualProps: ['to', 'nudge'],
            upgrade,
            ifWantsToBe,
            intro: 'intro',
            primaryProp: 'to',
            proxyPropDefaults: {
                nudge: true,
            }
        },
        actions: {
            'onTo': 'to'
        }
    },
    complexPropDefaults: {
        controller: BeCommitted
    }
});
register(ifWantsToBe, upgrade, tagName);
