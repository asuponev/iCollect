import MiniSearch from 'minisearch';

let searchIndexFull = new MiniSearch({
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
    'collection.authorId.lastName',
    'comments',
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

const seacrhIndexTag = new MiniSearch({
  idField: '_id',
  fields: ['tags'],
  storeFields: ['_id', 'title', 'tags', 'collectionId', 'collection']
});

export const searchItems = (items, value, query) => {
  if (query === 'full') {
    searchIndexFull.removeAll();
    searchIndexFull.addAll(items);
    return searchIndexFull.search(value);
  } else if (query === 'tag') {
    seacrhIndexTag.removeAll();
    seacrhIndexTag.addAll(items);
    value = value.slice(7);
    return seacrhIndexTag.search(value);
  }
}