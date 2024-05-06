import { DashboardItem } from './_components/client'
import { Heading } from '@/components/ui/heading'

const DashboardPage = async () => {
  
  return (
    <div className="flex-col space-y-4 p-8 pt-6">
      <Heading
        title="Dashboard Item"
        description="Manage"
      />
      
      <DashboardItem data={[]} />
      
      
      
    </div>
  )
}

export default DashboardPage
