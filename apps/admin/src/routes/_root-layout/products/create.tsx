import { createFileRoute } from '@tanstack/react-router'
import { ProductCreate } from '~/components/products/product-create'

export const Route = createFileRoute('/_root-layout/products/create')({
  component: () => <ProductCreate/>,
})
