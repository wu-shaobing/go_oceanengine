/**
 * Display utilities for formatting numbers, currency, dates, etc.
 * Using Intl API for consistent Asia/Shanghai timezone and zh-CN locale
 */

// Number formatter (reusable)
const numberFormatter = new Intl.NumberFormat('zh-CN')

// Currency formatter (yuan with 2 decimals)
const currencyFormatter = new Intl.NumberFormat('zh-CN', {
  style: 'currency',
  currency: 'CNY',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

// Date formatter (Asia/Shanghai timezone)
const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
  timeZone: 'Asia/Shanghai',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

// DateTime formatter (Asia/Shanghai timezone)
const dateTimeFormatter = new Intl.DateTimeFormat('zh-CN', {
  timeZone: 'Asia/Shanghai',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
})

export function formatNumber(num: number | undefined | null): string {
  if (num === undefined || num === null) return '-'
  return numberFormatter.format(num)
}

export function formatCost(cost: number | undefined | null): string {
  if (cost === undefined || cost === null) return '-'
  // Backend returns cost in cents, convert to yuan
  return currencyFormatter.format(cost / 100)
}

export function formatCtr(ctr: number | undefined | null): string {
  if (ctr === undefined || ctr === null) return '-'
  return `${(ctr * 100).toFixed(2)}%`
}

export function formatPercent(value: number | undefined | null, decimals = 2): string {
  if (value === undefined || value === null) return '-'
  return `${(value * 100).toFixed(decimals)}%`
}

export function formatDate(
  date: string | number | Date | undefined | null,
  format: 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss' = 'YYYY-MM-DD'
): string {
  if (!date) return '-'

  const d = typeof date === 'number' ? new Date(date * 1000) : new Date(date)

  if (format === 'YYYY-MM-DD') {
    return dateFormatter.format(d).replace(/\//g, '-')
  }

  return dateTimeFormatter.format(d).replace(/\//g, '-').replace(',', '')
}

export function formatTimestamp(timestamp: number | undefined | null): string {
  if (!timestamp) return '-'
  return dateTimeFormatter.format(new Date(timestamp * 1000)).replace(',', '')
}

export function abbreviateNumber(num: number): string {
  if (num >= 1e8) return `${(num / 1e8).toFixed(1)}亿`
  if (num >= 1e4) return `${(num / 1e4).toFixed(1)}万`
  return num.toString()
}
