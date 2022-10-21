import {RenderContext, TransformPluginSettings} from 'trans-render/lib/types';
import {attach} from 'be-decorated/upgrade.js';
import {DEMethods} from 'be-decorated/types';
import {register} from 'trans-render/lib/pluginMgr.js';

export const trPlugin: TransformPluginSettings = {
    selector: 'beCommittedAttribs',
    ready: true,
    processor:  async ({target, val, attrib, host}: RenderContext) => {
        if(customElements.get('be-committed') === undefined) return;
        const instance = document.createElement('be-committed') as any as DEMethods;
        attach(target!, 'committed', instance.attach.bind(instance));
    }
}

register(trPlugin);