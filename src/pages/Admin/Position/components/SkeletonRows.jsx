import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonRows({ rows = 5 }) {
  return Array.from({ length: rows }).map((_, i) => (
    <tr key={i}>
      {/* Position Title - with title and tags */}
      <td className="p-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <div className="flex gap-1">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>
        </div>
      </td>
      
      {/* Department */}
      <td className="p-4">
        <Skeleton className="h-6 w-24 rounded-full" />
      </td>
      
      {/* Location */}
      <td className="p-4">
        <div className="flex items-center gap-1">
          <Skeleton className="h-3 w-3 rounded" />
          <Skeleton className="h-4 w-28" />
        </div>
      </td>
      
      {/* Type */}
      <td className="p-4">
        <Skeleton className="h-6 w-20 rounded-full" />
      </td>
      
      {/* Status */}
      <td className="p-4">
        <Skeleton className="h-6 w-24 rounded-full" />
      </td>
      
      {/* Applications */}
      <td className="p-4">
        <div className="space-y-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-20" />
        </div>
      </td>
      
      {/* Deadline */}
      <td className="p-4">
        <div className="flex items-center gap-1">
          <Skeleton className="h-3 w-3 rounded" />
          <Skeleton className="h-4 w-20" />
        </div>
      </td>
      
      {/* Priority */}
      <td className="p-4">
        <Skeleton className="h-6 w-16 rounded-full" />
      </td>
      
      {/* Actions */}
      <td className="p-4 text-right">
        <Skeleton className="h-8 w-8 rounded ml-auto" />
      </td>
    </tr>
  ));
}