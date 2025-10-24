import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '../ui/Input'

describe('Input Component', () => {
  it('renders input element', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('handles onChange events', () => {
    const handleChange = vi.fn()
    render(<Input onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test value' } })
    
    expect(handleChange).toHaveBeenCalled()
  })

  it('sets value prop', () => {
    render(<Input value="initial value" onChange={() => {}} />)
    expect(screen.getByRole('textbox')).toHaveValue('initial value')
  })

  it('supports different input types', () => {
    const { container, rerender } = render(<Input type="password" />)
    const passwordInput = container.querySelector('input[type="password"]')
    expect(passwordInput).toBeInTheDocument()
    expect(passwordInput).toHaveAttribute('type', 'password')
    
    rerender(<Input type="email" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')
  })

  it('applies custom className', () => {
    render(<Input className="custom-input" />)
    expect(screen.getByRole('textbox')).toHaveClass('custom-input')
  })

  it('can be disabled', () => {
    render(<Input disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })
})
