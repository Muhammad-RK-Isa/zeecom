import React from 'react'
import { SidebarTrigger } from '~/components/ui/sidebar'

export default function RootHeader() {
  return (
    <header className='border-b w-full sticky z-50 top-0 bg-sidebar'>
      <nav className='p-4'>
        <SidebarTrigger />
      </nav>
    </header>
  )
}
