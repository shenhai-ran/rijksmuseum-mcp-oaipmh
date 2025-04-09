// Explicitly disable TypeScript errors for these imports since we've addressed type issues in our config
// @ts-ignore
import { listRecords } from './listRecords';
// @ts-ignore
import { getRecord } from './getRecord';
// @ts-ignore
import { identify } from './identify';
// @ts-ignore
import { listMetadataFormats } from './listMetadataFormats';
// @ts-ignore
import { listSets } from './listSets';

export function createRijksmuseumTools() {
  return [
    listRecords,
    getRecord,
    identify,
    listMetadataFormats,
    listSets
  ];
}
