import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import productTypes from './productType'
import orderType from './orderType'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, productTypes, orderType],
}
