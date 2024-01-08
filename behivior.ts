import {register} from 'be-hive/register.js';
import {tagName } from './be-committed.js';
import './be-committed.js';

const ifWantsToBe = 'committed';
const upgrade = '*';

register(ifWantsToBe, upgrade, tagName);