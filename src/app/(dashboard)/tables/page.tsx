import { formatter } from '@/lib/utils'
import tableApi from '@/services/api/modules/table-api'
import { Table } from '@/types'

import { TablesClient } from './_components/client'
import { TableColumn } from './_components/columns'

const TablesPage = async () => {
  const { response: tables } = await tableApi.getTables()

  const formattedTables: TableColumn[] = tables.map((item: Table) => ({
    id: item.id,
    name: item.name,
    min: formatter(+item.minBuyIn),
    max: formatter(+item.maxBuyIn),
    owner: item.user?.username,
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TablesClient data={formattedTables} />
      </div>
    </div>
  )
}

export default TablesPage
