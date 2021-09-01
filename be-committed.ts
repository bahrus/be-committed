import {XtalDecor, XtalDecorCore} from 'xtal-decor/xtal-decor.js';
import {CE} from 'trans-render/lib/CE.js';

// export class BeCommitted extends XtalDecor{
// }

// interface HasSelf{
//     self: HTMLInputElement
// }

const ce = new CE<XtalDecorCore<HTMLInputElement>>({
    config:{
        tagName: 'be-committed',
        propDefaults:{
            upgrade: 'input',
            ifWantsToBe: 'committed',
            virtualProps: ['to']
        }
    },
    complexPropDefaults:{
        actions:[
            ({to, self}: any) => {
                const clickableElement = (self.getRootNode() as HTMLElement).querySelector('#' + to) as HTMLButtonElement;
                if(clickableElement === null){
                    console.error('Unable to locate target');
                    return;
                }
                self.addEventListener('keyup', e =>{
                    if(e.key === 'Enter'){
                        e.preventDefault();
                        clickableElement.click()
                    }
                    
                });
            }
        ],
        init: (self: HTMLInputElement) => {

        }
    },
    superclass: XtalDecor
});
document.head.appendChild(document.createElement('be-committed'));