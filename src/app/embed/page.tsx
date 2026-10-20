import EmbedClient from '@/components/EmbedClient';
import { getSession } from '@/lib/getSession'
import React from 'react'

const page = async() => {
    const session= await getSession();

  return (
    <div>
        <EmbedClient userId={session?.user?.id}/>
      
    </div>
  )
}

export default page
