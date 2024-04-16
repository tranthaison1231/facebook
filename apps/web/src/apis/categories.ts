import { request } from "@/utils/request"

export interface Category {
  id: string
  name: string
  icon: string
}

export const fetchCategories = async (): Promise<Category[]> => {
  const res =  await request.get(`/categories`);
  return res.data.data
}
