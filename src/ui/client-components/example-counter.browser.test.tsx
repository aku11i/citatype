import { getByRole, getByText } from '@testing-library/dom'
import { describe, it, expect, beforeEach } from 'vitest'
import './example-counter.js'

describe('ExampleCounter', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('increments when the button is clicked', () => {
    const counter = document.createElement('example-counter')
    document.body.appendChild(counter)

    expect(getByText(counter, '0')).toBeInTheDocument()

    const button = getByRole(counter, 'button', { name: '+1' })
    button.click()

    expect(getByText(counter, '1')).toBeInTheDocument()
  })
})
