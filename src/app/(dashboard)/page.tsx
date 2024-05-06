import { DashboardItem } from './_components/client'
import { Heading } from '@/components/ui/heading'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


const DashboardPage = async () => {
  
  return (
    <div className="flex-col space-y-4 p-8 pt-6">
      <Heading
        title="Dashboard Item"
        description="Manage"
      />
      
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    
    
    
    
    </div>
  )
}

export default DashboardPage
