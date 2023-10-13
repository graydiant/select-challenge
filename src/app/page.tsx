'use client'

import dynamic from 'next/dynamic'

const ClientHome = dynamic(() => import('./HomeBody'), { ssr: false })

export default function Home() {
  return <ClientHome />
}
