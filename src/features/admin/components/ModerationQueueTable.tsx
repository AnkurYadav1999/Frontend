import React from 'react';
import { Check, X, ShieldAlert } from 'lucide-react';
import { ModerationJobItem } from '../types';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Skeleton } from '../../../components/ui/Skeleton';
import { EmptyState } from '../../../components/ui/EmptyState';

interface ModerationQueueTableProps {
  queue?: ModerationJobItem[];
  isLoading: boolean;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export const ModerationQueueTable: React.FC<ModerationQueueTableProps> = ({
  queue,
  isLoading,
  onApprove,
  onReject,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2].map((n) => (
          <Skeleton key={n} height={50} />
        ))}
      </div>
    );
  }

  if (!queue || queue.length === 0) {
    return (
      <EmptyState
        title="Moderation Queue Clear"
        description="All employer job postings have been reviewed and approved."
        icon={<ShieldAlert className="w-6 h-6 text-purple-400" />}
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-surface-800 bg-surface-900 shadow-sm">
      <table className="w-full text-left text-xs">
        <thead className="bg-surface-800/80 border-b border-surface-800 uppercase font-semibold text-surface-400">
          <tr>
            <th className="px-4 py-3">Position Title</th>
            <th className="px-4 py-3">Company</th>
            <th className="px-4 py-3">Submitted By</th>
            <th className="px-4 py-3">Submitted Date</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Moderation Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-800 font-medium text-surface-200">
          {queue.map((item) => (
            <tr key={item.id} className="hover:bg-surface-800/40 transition-colors">
              <td className="px-4 py-3 font-semibold text-white">{item.title}</td>
              <td className="px-4 py-3 text-surface-300">{item.companyName}</td>
              <td className="px-4 py-3 text-surface-400">{item.submittedBy}</td>
              <td className="px-4 py-3 font-mono text-surface-400">
                {new Date(item.submittedAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <Badge
                  variant={
                    item.status === 'pending'
                      ? 'warning'
                      : item.status === 'approved'
                        ? 'success'
                        : 'error'
                  }
                >
                  {item.status.toUpperCase()}
                </Badge>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 text-xs"
                    onClick={() => onApprove(item.id)}
                    leftIcon={<Check className="w-3.5 h-3.5" />}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    className="px-2.5 py-1 text-xs"
                    onClick={() => onReject(item.id)}
                    leftIcon={<X className="w-3.5 h-3.5" />}
                  >
                    Reject
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
