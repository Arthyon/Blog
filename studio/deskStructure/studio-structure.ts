import {ListItemBuilder, StructureBuilder} from 'sanity/desk'
import {HomeIcon} from '@sanity/icons'

const hiddenDocTypes = (item: ListItemBuilder) => !['landingPage'].includes(item.getId() || '')

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Landing Page')
        .icon(HomeIcon)
        .child(S.editor().id('landingPage').schemaType('landingPage').documentId('landingPage')),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
