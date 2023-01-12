import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {codeInput} from '@sanity/code-input'
import {structure} from './deskStructure/studio-structure'

export default defineConfig({
  name: 'default',
  title: 'homepage',

  projectId: 'b2xsdtsf',
  dataset: 'production',

  plugins: [
    deskTool({
      structure,
    }),
    visionTool(),
    codeInput(),
  ],

  schema: {
    types: schemaTypes,
  },
})
