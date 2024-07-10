import { expect, test } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryProvider } from '@/configs/query-client'
import ShortCut from './ShortCut'
import { RenderRouteWithOutletContext } from '@/helpers/test'
import { shortCutsMock } from '@/mocks'

const renderShortCut = () => {
  render(
    <QueryProvider>
      <RenderRouteWithOutletContext>
        <ShortCut />
      </RenderRouteWithOutletContext>
    </QueryProvider>
  )
}

describe('Shortcut component', () => {
  test('should render the shortcut correctly', async () => {
    renderShortCut()

    const title = screen.getByText('LỐI TẮT CỦA BẠN')

    await waitFor(() => {
      expect(title).toBeInTheDocument()

      const group = screen.queryByText(shortCutsMock[0].group.name)
      const avatar = screen.queryByAltText(shortCutsMock[0].group.name)

      expect(avatar).toHaveAttribute('src', shortCutsMock[0].group.avatar)
      expect(group).toBeInTheDocument()
    })
  })
})
