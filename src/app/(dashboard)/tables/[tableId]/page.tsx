import tableApi from '@/services/api/modules/table-api'

import { TableForm } from './_components/table-form'

type Props = {
  params: {
    tableId: string
  }
}

const TablePage = async ({ params }: Props) => {
  const { response: table } = await tableApi.getTableById({
    tableId: params.tableId,
  })

  const formattedTable = {
    ...table,
    minBuyIn: table.minBuyIn.toString(),
    ante: table.ante.toString(),
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TableForm initialData={formattedTable} />
      </div>
    </div>
  )
}

export default TablePage
