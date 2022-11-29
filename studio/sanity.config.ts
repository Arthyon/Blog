import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {codeInput} from '@sanity/code-input'
import {colorInput} from '@sanity/color-input'
import {structure} from './deskStructure/studio-structure'

export default defineConfig({
  name: 'default',
  title: 'homepage',

  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.SANITY_STUDIO_DATASET,

  plugins: [
    deskTool({
      structure,
    }),
    visionTool(),
    codeInput(),
    colorInput(),
  ],

  schema: {
    types: schemaTypes,
  },
})
