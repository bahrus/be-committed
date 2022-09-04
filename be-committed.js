import { define } from 'be-decorated/be-decorated.js';
import { nudge } from 'trans-render/lib/nudge.js';
import { register } from 'be-hive/register.js';
export class BeCommitted extends EventTarget {
    clickableElementRef;
    intro(proxy, target, beDecorProps) {
        target.addEventListener('keyup', this.handleKeyup);
        proxy.resolved = true;
    }
    onTo({ to, proxy }) {
        const clickableElement = proxy.getRootNode().querySelector('#' + to);
        if (clickableElement === null) {
            console.error('Unable to locate target');
            return;
        }
        nudge(proxy);
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
            virtualProps: ['to'],
            upgrade,
            ifWantsToBe,
            intro: 'intro',
            primaryProp: 'to'
        },
        actions: {
            'onTo': {
                ifAllOf: ['to']
            }
        }
    },
    complexPropDefaults: {
        controller: BeCommitted
    }
});
register(ifWantsToBe, upgrade, tagName);
