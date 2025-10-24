import { useQuery } from '@tanstack/react-query'
import { getReport, type ReportParams } from '@/lib/api/report'

interface UseReportOptions {
  advertiser_id: string
  startDate: string
  endDate: string
  dimension?: 'date' | 'project' | 'ad'
  enabled?: boolean
}

export function useReport({ 
  advertiser_id,
  startDate, 
  endDate,
  dimension = 'date',
  enabled = true 
}: UseReportOptions) {
  const canQuery = Boolean(advertiser_id) && enabled

  const query = useQuery({
    queryKey: ['report', advertiser_id, startDate, endDate, dimension],
    queryFn: async () => {
      const params: ReportParams = {
        advertiser_id,
        start_date: startDate,
        end_date: endDate,
        dimension,
      }
      return getReport(params)
    },
    enabled: canQuery,
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  return {
    ...query,
    reportData: query.data?.data || [],
    summary: query.data?.summary,
    canQuery,
  }
}
