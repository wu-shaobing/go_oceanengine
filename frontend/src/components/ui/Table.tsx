type TableColumn<T> = {
  key: string
  header?: string
  title?: string  // Support both header and title
  width?: string
  render?: (row: T) => React.ReactNode
}

type TableProps<T = Record<string, unknown>> = {
  columns: TableColumn<T>[]
  data: T[]
  emptyMessage?: string
}

export function Table<T extends Record<string, unknown>>({ columns, data, emptyMessage = '暂无数据' }: TableProps<T>) {
  return (
    <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {columns.map((c) => (
              <th 
                key={c.key} 
                className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300"
                style={c.width ? { width: c.width } : undefined}
              >
                {c.header || c.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                    {c.render ? c.render(row) : String(row[c.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
