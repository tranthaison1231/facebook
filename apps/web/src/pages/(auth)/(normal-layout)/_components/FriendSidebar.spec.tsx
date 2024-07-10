import { fireEvent, render, screen } from '@testing-library/react'
import FriendSidebar, { SIDE_BARS } from './FriendSidebar'
import { MemoryRouter } from 'react-router-dom'

const renderFriendSidebar = () =>
  render(
    <MemoryRouter initialEntries={['/friends']}>
      <FriendSidebar />
    </MemoryRouter>
  )

describe('FriendSidebar', () => {
  it('renders correctly', () => {
    renderFriendSidebar()

    expect(screen.getByText('Friends')).toBeInTheDocument()

    SIDE_BARS.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument()
    })
  })

  it('has active class when location matches', () => {
    renderFriendSidebar()

    const homeLink = screen.getByRole('link', { name: 'Home' })
    const homeIcon = screen.getByTestId(`Home-icon`)
    expect(homeLink).toHaveClass('bg-gray-100')
    expect(homeIcon).toHaveClass('bg-blue-500')

    const birthdayLink = screen.getByRole('link', { name: 'Birthdays' })

    fireEvent.click(birthdayLink)

    const birthdayIcon = screen.getByTestId(`Birthdays-icon`)

    expect(homeLink).not.toHaveClass('bg-gray-100')
    expect(homeIcon).not.toHaveClass('bg-blue-500')
    expect(birthdayLink).toHaveClass('bg-gray-100')
    expect(birthdayIcon).toHaveClass('bg-blue-500')
  })
})
