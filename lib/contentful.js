export const mapSectionsToQuery = (sectionData, dehydratedQuery) => {
  const queriedSlides = dehydratedQuery.queries.find(
    (q) => q.queryKey === 'slides'
  )

  const slides = sectionData.map((section) => {
    const slide = queriedSlides.state.data.items.find(
      (s) => s.fields.pageId === section.title.toLowerCase()
      )
      const fields = slide?.fields || {}

      return { ...fields, ...section }
  })

  return slides

}
