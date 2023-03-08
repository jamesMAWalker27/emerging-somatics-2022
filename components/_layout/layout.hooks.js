import { useCallback, useEffect, useState } from 'react'
import gsap from 'gsap'

export const useHeroVideoReady = (onLoadedAction) => {
  const [loading, setLoading] = useState(true)

  const handleVideoReady = useCallback((onComplete = () => {}) => {
    setTimeout(() => {
      gsap.to('#loading-shade', {
        opacity: 0,
        onComplete,
      })
    }, 1000)
  })

  // action on video ready
  useEffect(() => {
    const video = document.getElementById('video-main')
    
    const handleCanPlay = () => {
      handleVideoReady(() => setLoading(false))
      video.removeEventListener('canplay', handleVideoReady)
    }

    video.addEventListener('canplay', handleCanPlay)

    return () => video.removeEventListener('canplay', handleCanPlay)
  }, [handleVideoReady])

  // action on timeout
  useEffect(() => {
    const video = document.getElementById('video-main')

    setTimeout(() => {
      video.removeEventListener('canplay', handleVideoReady)
      setLoading(false)
    }, 5000)
  }, [])

  useEffect(() => {
    if (!loading) onLoadedAction()
  }, [onLoadedAction, loading])

  return loading
}
