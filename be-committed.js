import { XtalDecor } from 'xtal-decor/xtal-decor.js';
import { CE } from 'trans-render/lib/CE.js';
const ce = new CE({
    config: {
        tagName: 'be-committed',
        propDefaults: {
            upgrade: 'input',
            ifWantsToBe: 'committed',
            virtualProps: ['to', 'clickableElement']
        }
    },
    complexPropDefaults: {
        actions: [
            ({ to, self }) => {
                const clickableElement = self.getRootNode().querySelector('#' + to);
                if (clickableElement === null) {
                    console.error('Unable to locate target');
                    //TODO:  turn xtal-decor  attach forwarded second half into reusable function.  Use it here
                    return;
                }
                self.clickableElement = clickableElement;
            }
        ],
        on: {
            'keyup': ({ self }, e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    self.clickableElement.click();
                }
            }
        },
        init: (self) => { }
    },
    superclass: XtalDecor
});
document.head.appendChild(document.createElement('be-committed'));
