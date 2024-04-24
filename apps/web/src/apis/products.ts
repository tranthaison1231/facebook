import { request } from "@/utils/request"

export interface Products{
    id: string
    categoryId: string
    name: string
    price: number
    description: string
    img: string
    location:string
}

export const fetchProducts = async (): Promise<Products[]> => {
    const res =  await request.get(`/products`);
    return res.data.data
  }
export const getProductsByCategoryId = async (categoryId:string) => {
    const res = await request.get(`/products/${categoryId}`)
    return res.data
} 