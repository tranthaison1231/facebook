import { request } from "@/utils/request"

export interface Products{
    id: string
    name: string
    price: number
    description: string
    image: string
    location:string
}

export const fetchProducts = async (): Promise<Products[]> => {
    const res =  await request.get(`/products`);
    return res.data.data
  }
  