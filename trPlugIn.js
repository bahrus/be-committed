import { register } from 'trans-render/lib/pluginMgr.js';
export const trPlugin = {
    selector: 'beCommittedAttribs',
    ready: true,
    processor: async ({ target, val, attrib, host }) => {
        if (customElements.get('be-committed') === undefined)
            return;
        const { attach } = await import('be-decorated/upgrade.js');
        const instance = document.createElement('be-committed');
        attach(target, 'committed', instance.attach.bind(instance));
    }
};
register(trPlugin);
