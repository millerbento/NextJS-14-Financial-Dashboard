import DashboardSkeleton from '@/app/ui/skeletons';
 
//Skeleton only applies to "overview" wich is the dashboard home
//So "/dashboard/(overview)/page.tsx" becomes "/dashboard"

export default function Loading() {
  return <DashboardSkeleton />;
}