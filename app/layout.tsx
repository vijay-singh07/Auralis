import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import getSongsByUserId from '@/actions/getSongsByUserId'
import Player from '@/components/Player'

import getPlaylistByUserId from '@/actions/getPlaylistBYUserId'

const font = Figtree({ subsets: ['latin'] })

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'SongiFy',
  description: 'Listen to music without adds',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userSongs = await getSongsByUserId();
  const userPlaylist = await getPlaylistByUserId();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider/>
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider/>
        <Sidebar songs={userSongs} playlist={userPlaylist}>
          {children}
        </Sidebar>
        <Player/>
        </UserProvider>
        </SupabaseProvider>
        </body>
    </html>
  )
}
