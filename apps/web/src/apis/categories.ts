export interface Category {
  id: string
  name: string
  icon: string
}

export const fetchCategories = async (): Promise<Category[]> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`)
  const json = await res.json()
  return json.data
}
