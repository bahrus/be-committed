import { define } from 'be-decorated/be-decorated.js';
import { nudge } from 'trans-render/lib/nudge.js';
import { register } from 'be-hive/register.js';
export class BeCommittedController {
    clickableElementRef;
    intro(self, inp) {
        inp.addEventListener('keyup', this.handleKeyup);
    }
    onTo({ to }) {
        const clickableElement = this.proxy.getRootNode().querySelector('#' + to);
        if (clickableElement === null) {
            console.error('Unable to locate target');
            return;
        }
        nudge(this.proxy);
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
            upgrade: 'input',
            ifWantsToBe,
            intro: 'intro'
        },
        actions: {
            'onTo': {
                ifAllOf: ['to']
            }
        }
    },
    complexPropDefaults: {
        controller: BeCommittedController
    }
});
register(ifWantsToBe, upgrade, tagName);
