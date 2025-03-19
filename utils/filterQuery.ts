export function filterQuery(query: QueryParams): QueryParams {
  if (!query || typeof query !== 'object') {
    return {}
  }

  return Object.fromEntries(
    Object.entries(query).filter(([_, value]) => value !== undefined && value !== null),
  )
}
