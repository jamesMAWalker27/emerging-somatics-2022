import { useCallback, useEffect, useState } from 'react'
import gsap from 'gsap'

export const useHeroVideoReady = (onLoadedAction) => {
   const [loading, setLoading] = useState(true)

   const handleVideoReady = useCallback(() => {
     setTimeout(() => {
       gsap.to('#loading-shade', {
         opacity: 0,
         onComplete: () => {
           setLoading(false)
         },
       })
     }, 1000)
   })

   useEffect(() => {
     const video = document.getElementById('video-main')

     const handleCanPlay = () => {
       handleVideoReady()
       video.removeEventListener('canplay', handleVideoReady)
     }

     video.addEventListener('canplay', handleCanPlay)

     return () => video.removeEventListener('canplay', handleCanPlay)
   }, [handleVideoReady])

   useEffect(() => {
     if (!loading) onLoadedAction()
   }, [onLoadedAction, loading])

   return loading
}