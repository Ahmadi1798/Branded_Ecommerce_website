import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {banner} from './schemaTypes/banner'

export default defineConfig({
  name: 'default',
  title: 'ecommerce',

  projectId: '4oo8z2er',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes.concat([banner]),
  },
})
