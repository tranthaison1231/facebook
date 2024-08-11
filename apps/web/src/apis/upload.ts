import { request } from '@/utils/request'

export const uploadFile = (data: FormData) => {
  return request.post('/upload', data)
}

export interface GetPresignedUrlDto {
  fileName: string
  type: string
  folderPrefix?: string
}

export const getPresignedUrl = async (presignedUrlDto: GetPresignedUrlDto) => {
  return request.post('/upload/presigned-url', presignedUrlDto)
}
