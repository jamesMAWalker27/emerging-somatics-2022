import React from 'react'
import { createClient } from 'contentful'

export const useContentful = () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    host: 'cdn.contentful.com',
  })

  const getSlides = async () => {
    try {
      const slides = await client.getEntries({
        content_type: 'slide',
      })
      
      return slides;
    } catch (error) {
      console.log('Contentful: Error getting slide content - ', error)
    }
  }

  return { getSlides }
}
