export const imgData = {
  forest: {
    slug: 'ferns_exk1af',
  },
  bench: {
    slug: 'bench-forest_nnjbst',
  },
  about: {
    slug: 'about_gmtfyh',
  },
  mountains: {
    slug: 'mountains-2_rjf9dr',
  },
}

// export const baseUrlMp4 = (slug, videoCode, quality='good') => {
export const baseUrlMp4 = ({ slug = '', quality = 'good' }) => {
  return `https://res.cloudinary.com/jameswalker-work/video/upload/f_auto,q_auto:${quality}/v1663170955/emerging/${slug}.mp4`
}

export const baseUrlMp4_NS = ({ slug = '' }) => {
  return `https://res.cloudinary.com/jameswalker-work/video/upload/v1663170955/emerging/${slug}.mp4`
}

export const baseUrlPng = ({ slug, quality = 'good' }) => {
  return `https://res.cloudinary.com/jameswalker-work/image/upload/f_auto,q_auto:${quality}/v1663154648/emerging/${slug}.png`
}