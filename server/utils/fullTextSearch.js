import MiniSearch from 'minisearch';

let searchIndex = new MiniSearch({
  idField: '_id',
  fields: [
    'title', 'tags',
    'string1', 'string2', 'string3',
    'text1', 'text2', 'text3',
    'number1', 'number2', 'number3',
    'date1', 'date2', 'date3',
    'collection.title',
    'collection.description',
    'collection.authorId.firstName',
    'collection.authorId.lastName'
  ],
  extractField: (document, fieldName) => {
    return fieldName.split('.').reduce((doc, key) => doc && doc[key], document)
  },
  storeFields: ['_id', 'title', 'tags', 'collectionId', 'collection'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.25
  }
});

export const fullTextSearch = (items, value) => {
  searchIndex.removeAll();
  searchIndex.addAll(items);
  return searchIndex.search(value);
}