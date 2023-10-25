import ClientComponent from './client-component'
// import ClientComponentMap from './client-component-map'
import ServerComponent from './server-component'
 
// Pages in Next.js are Server Components by default
export default function Faq({ data }: any) {
  return (
    <ClientComponent data={data}>
      <ServerComponent data={data} />
    </ClientComponent>
  )
}