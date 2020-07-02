/*
 * Patron saga Messages
 *
 * This contains all the text for the Patron container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ReferencePage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'References form',
  },
  headerDetail: {
    id: `${scope}.headerDetail`,
    defaultMessage: 'Reference Detail',
  },
  referenceAdded: {
    id: `${scope}.referenceAdded`,
    defaultMessage: 'Reference added',
  },
  referenceUpdate: {
    id: `${scope}.referenceUpdate`,
    defaultMessage: 'Reference updated',
  },
  material_type: {
    id: `${scope}.material_type`,
    defaultMessage: 'Material type',
  },
  pubyear: {
    id: `${scope}.pubyear`,
    defaultMessage: 'Pubblication year',
  },
  page_start: {
    id: `${scope}.page_start`,
    defaultMessage: 'Page starts',
  },
  page_end: {
    id: `${scope}.page_end`,
    defaultMessage: 'Page ends',
  },
  abstract: {
    id: `${scope}.abstract`,
    defaultMessage: 'Abstract',
  },
  pub_title: {
    id: `${scope}.pub_title`,
    defaultMessage: 'Pubblication title',
  },
  part_title: {
    id: `${scope}.part_title`,
    defaultMessage: 'Part title',
  },
  first_author: {
    id: `${scope}.first_author`,
    defaultMessage: 'First author',
  },
  last_author: {
    id: `${scope}.last_author`,
    defaultMessage: 'Last author',
  },
  volume: {
    id: `${scope}.volume`,
    defaultMessage: 'Volume',
  },
  issue: {
    id: `${scope}.issue`,
    defaultMessage: 'Issue',
  },
  doi: {
    id: `${scope}.doi`,
    defaultMessage: 'Doi',
  },
  issn: {
    id: `${scope}.issn`,
    defaultMessage: 'Issn',
  },
  publisher: {
    id: `${scope}.publisher`,
    defaultMessage: 'Publisher',
  },
  publishing_place: {
    id: `${scope}.publishing_place`,
    defaultMessage: 'Publishing place',
  },
  isbn: {
    id: `${scope}.isbn`,
    defaultMessage: 'Isbn',
  },
  sid: {
    id: `${scope}.sid`,
    defaultMessage: 'Sid',
  },
  pmid: {
    id: `${scope}.pmid`,
    defaultMessage: 'Pmid',
  },
  updateSubmitText: {
    id: `${scope}.updateSubmitText`,
    defaultMessage: 'Update Reference',
  },
  createSubmitText: {
    id: `${scope}.createSubmitText`,
    defaultMessage: 'Create Reference',
  },
});
