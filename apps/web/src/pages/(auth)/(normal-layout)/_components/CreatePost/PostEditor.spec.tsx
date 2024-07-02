import { expect, test } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import PostEditor from './PostEditor'
import { RenderRouteWithOutletContext } from '@/helpers/test'
import { QueryProvider } from '@/configs/query-client'

const renderPostEditor = () => {
  render(
    <QueryProvider>
      <RenderRouteWithOutletContext
        context={{
          me: {
            firstName: 'John',
            lastName: 'Doe',
            avatar: 'https://example.com/avatar.jpg'
          }
        }}
      >
        <PostEditor onClose={() => {}} onSelectPublicType={() => {}} publishType="PUBLIC" />)
      </RenderRouteWithOutletContext>
    </QueryProvider>
  )
}

describe('PostEditor component', () => {
  test('should render the editor correctly', () => {
    renderPostEditor()

    const title = screen.getByText('Tạo Bài viết')
    const username = screen.getByText('John Doe')
    const textarea = screen.getByRole('textbox')

    const publishButton = screen.getByRole('button', { name: 'Đăng' })

    expect(title).toBeInTheDocument()
    expect(username).toBeInTheDocument()
    expect(textarea).toHaveAttribute('placeholder', 'John Doe ơi, Bạn đang nghĩ gì thế?')
    expect(publishButton).toBeInTheDocument()
  })

  test('Should render show image input when click to Add Ảnh/video button', () => {
    renderPostEditor()

    const addPhotoButton = screen.getByAltText('Ảnh/Videos')

    fireEvent.click(addPhotoButton)

    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
  })
})
