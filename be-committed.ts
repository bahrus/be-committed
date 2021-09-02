import {XtalDecor, XtalDecorCore} from 'xtal-decor/xtal-decor.js';
import {CE} from 'trans-render/lib/CE.js';

const ce = new CE<XtalDecorCore<HTMLInputElement>>({
    config:{
        tagName: 'be-committed',
        propDefaults:{
            upgrade: 'input',
            ifWantsToBe: 'committed',
            virtualProps: ['to', 'clickableElement']
        }
    },
    complexPropDefaults:{
        actions:[
            ({to, self}: any) => {
                const clickableElement = (self.getRootNode() as HTMLElement).querySelector('#' + to) as HTMLButtonElement;
                if(clickableElement === null){
                    console.error('Unable to locate target');
                    //TODO:  turn xtal-decor  attach forwarded second half into reusable function.  Use it here
                    return;
                }
                self.clickableElement = clickableElement;
            }
        ],
        on:{
            'keyup': ({self}: any, e: KeyboardEvent) => {
                if(e.key === 'Enter'){
                    e.preventDefault();
                    self.clickableElement.click()
                }
            }
        },
        init: (self: HTMLInputElement) => {}
    },
    superclass: XtalDecor
});
document.head.appendChild(document.createElement('be-committed'));