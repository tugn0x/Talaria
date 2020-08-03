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
    defaultMessage: 'Enter a new reference',
  },
  headerDetail: {
    id: `${scope}.headerDetail`,
    defaultMessage: 'Reference Detail',
  },
  headerRequest: {
    id: `${scope}.headerRequest`,
    defaultMessage: 'Reference Request',
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
    defaultMessage: 'Year',
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
  note: {
    id: `${scope}.note`,
    defaultMessage: 'Note',
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
    defaultMessage: 'DOI',
  },
  issn: {
    id: `${scope}.issn`,
    defaultMessage: 'ISSN',
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
    defaultMessage: 'SID',
  },
  pmid: {
    id: `${scope}.pmid`,
    defaultMessage: 'PMID',
  },
  updateSubmitText: {
    id: `${scope}.updateSubmitText`,
    defaultMessage: 'Update Reference',
  },
  createSubmitText: {
    id: `${scope}.createSubmitText`,
    defaultMessage: 'Create Reference',
  },
  thesis: {
    id: `${scope}.thesis`,
    defaultMessage: 'Thesis',
  },
  article: {
    id: `${scope}.article`,
    defaultMessage: 'Article',
  },
  book: {
    id: `${scope}.book`,
    defaultMessage: 'Book',
  },
  chapter: {
    id: `${scope}.chapter`,
    defaultMessage: 'Chapter',
  },
  titleAuthorsHead: {
    id: `${scope}.titleAuthorsHead`,
    defaultMessage: 'Title and authors',
  },
  journalLabel: {
    id: `${scope}.journalLabel`,
    defaultMessage: 'Journal title',
  },
  articleLabel: {
    id: `${scope}.articleLabel`,
    defaultMessage: 'Article title',
  },
  authorsLabel: {
    id: `${scope}.authorsLabel`,
    defaultMessage: 'Authors(s)',
  },
  dateInstitutionPlaceHead: {
    id: `${scope}.dateInstitutionPlaceHead`,
    defaultMessage: 'Date institution and place',
  },
  identificationHead: {
    id: `${scope}.identificationHead`,
    defaultMessage: 'Identification',
  },
});
