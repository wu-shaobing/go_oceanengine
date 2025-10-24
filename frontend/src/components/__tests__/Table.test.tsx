import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Table } from '../ui/Table'

describe('Table Component', () => {
  const mockColumns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'status', header: 'Status' },
  ]

  const mockData = [
    { id: 1, name: 'Project A', status: 'Active' },
    { id: 2, name: 'Project B', status: 'Inactive' },
  ]

  it('renders table with headers', () => {
    render(<Table columns={mockColumns} data={[]} />)
    
    expect(screen.getByText('ID')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
  })

  it('renders table data', () => {
    render(<Table columns={mockColumns} data={mockData} />)
    
    expect(screen.getByText('Project A')).toBeInTheDocument()
    expect(screen.getByText('Project B')).toBeInTheDocument()
    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('Inactive')).toBeInTheDocument()
  })

  it('renders empty table when no data', () => {
    const { container } = render(<Table columns={mockColumns} data={[]} />)
    
    const tbody = container.querySelector('tbody')
    expect(tbody?.children.length).toBe(0)
  })

  it('handles custom render function', () => {
    type MockDataType = { id: number; name: string; status: string }
    const customColumns = [
      { 
        key: 'id', 
        header: 'ID',
        render: (row: MockDataType) => `#${row.id}`
      },
      { key: 'name', header: 'Name' },
    ]

    render(<Table<MockDataType> columns={customColumns} data={mockData} />)
    
    expect(screen.getByText('#1')).toBeInTheDocument()
    expect(screen.getByText('#2')).toBeInTheDocument()
  })

  it('handles missing data keys gracefully', () => {
    const dataWithMissingKeys = [
      { id: 1, name: 'Project A' }, // missing status
    ]

    render(<Table columns={mockColumns} data={dataWithMissingKeys} />)
    
    expect(screen.getByText('Project A')).toBeInTheDocument()
  })
})
