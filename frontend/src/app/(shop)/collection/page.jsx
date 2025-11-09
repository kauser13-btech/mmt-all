import { redirect } from 'next/navigation'

export default function CollectionPage() {
  // Redirect to T-shirts as default collection
  redirect('/collection/t-shirt')
}
