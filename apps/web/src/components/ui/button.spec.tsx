import { render, screen } from '@testing-library/react'
import { Button } from './button'

describe('Button component', () => {
  test('renders button with default props and children', () => {
    render(<Button>Click Me</Button>)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })

  test('renders button with different variants', () => {
    render([<Button variant="destructive">Destroy</Button>, <Button variant="outline">Outline</Button>])

    expect(screen.getByText('Destroy')).toHaveClass('bg-destructive')
    expect(screen.getByText('Outline')).toHaveClass('border border-input')
  })

  test('renders button with different sizes', () => {
    render([<Button size="sm">Small</Button>, <Button size="lg">Large</Button>])

    expect(screen.getByText('Small')).toHaveClass('h-9 rounded-md')
    expect(screen.getByText('Large')).toHaveClass('h-11 rounded-md')
  })

  test('renders button with disabled prop', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByText('Disabled')).toBeDisabled()
  })

  test('renders button with loading indicator', () => {
    render(<Button loading>Loading...</Button>)
    expect(screen.getByText('Loading...')).toBeInTheDocument()

    expect(screen.getByRole('button')).toContainHTML('svg')
  })
})
