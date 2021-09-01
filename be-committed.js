import { XtalDecor } from 'xtal-decor/xtal-decor.js';
import { CE } from 'trans-render/lib/CE.js';
// export class BeCommitted extends XtalDecor{
// }
// interface HasSelf{
//     self: HTMLInputElement
// }
const ce = new CE({
    config: {
        tagName: 'be-committed',
        propDefaults: {
            upgrade: 'input',
            ifWantsToBe: 'committed',
            virtualProps: ['to']
        }
    },
    complexPropDefaults: {
        actions: [
            ({ to, self }) => {
                const clickableElement = self.getRootNode().querySelector('#' + to);
                if (clickableElement === null) {
                    console.error('Unable to locate target');
                    return;
                }
                self.addEventListener('keyup', e => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        clickableElement.click();
                    }
                });
            }
        ],
        init: (self) => {
        }
    },
    superclass: XtalDecor
});
document.head.appendChild(document.createElement('be-committed'));
