import { define } from 'be-decorated/be-decorated.js';
import { nudge } from 'trans-render/lib/nudge.js';
export class BeCommittedController {
    #proxy;
    clickableElementRef;
    intro(self, inp) {
        this.#proxy = self;
        inp.addEventListener('keyup', this.handleKeyup);
    }
    onTo({ to }) {
        const clickableElement = this.#proxy.getRootNode().querySelector('#' + to);
        if (clickableElement === null) {
            console.error('Unable to locate target');
            return;
        }
        nudge(this.#proxy);
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
define({
    config: {
        tagName: tagName,
        propDefaults: {
            virtualProps: ['to'],
            upgrade: 'input',
            ifWantsToBe: 'committed',
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
document.head.appendChild(document.createElement(tagName));
