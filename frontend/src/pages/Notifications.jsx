import { useQuery } from '@tanstack/react-query';
import { fetchNotifications } from '../api/notifications';

export default function Notifications() {
  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
  });

  if (isLoading) {
    return (
      <div className="rounded-[2rem] bg-white/5 p-10 text-center text-brand-300 shadow-panel">
        Loading notifications...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[2rem] bg-white/5 p-10 text-center text-red-400 shadow-panel">
        Unable to load notifications. Please refresh the page.
      </div>
    );
  }

  const notifications = data || [];

  if (!notifications.length) {
    return (
      <div className="rounded-[2rem] bg-white/5 p-10 text-center text-brand-200 shadow-panel">
        <p className="text-xl font-semibold text-white">
          No notifications
        </p>
        <p className="mt-3 text-sm text-brand-300">
          You'll be notified when important events occur.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel">
        <h2 className="text-xl font-semibold text-white">
          Notifications
        </h2>

        <p className="mt-2 text-sm text-brand-300">
          Stay updated with request and system events.
        </p>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => {
          let bgColor = 'bg-white/5 border border-white/10';

          if (notification.type === 'error') {
            bgColor = 'bg-red-500/10 border border-red-500/30';
          } else if (notification.type === 'warning') {
            bgColor = 'bg-yellow-500/10 border border-yellow-500/30';
          } else if (notification.type === 'success') {
            bgColor = 'bg-green-500/10 border border-green-500/30';
          }

          return (
            <div
              key={notification._id}
              className={`rounded-2xl p-4 ${bgColor}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-white">
                    {notification.title}
                  </h3>

                  <p className="mt-1 text-sm text-brand-300">
                    {notification.message}
                  </p>
                </div>

                <span
                  className={`rounded px-2 py-1 text-xs font-medium ${
                    notification.read
                      ? 'bg-white/5 text-brand-300'
                      : 'bg-brand-300 text-brand-950'
                  }`}
                >
                  {notification.read ? 'Read' : 'New'}
                </span>
              </div>

              <p className="mt-2 text-xs text-brand-400">
                {new Date(
                  notification.createdAt
                ).toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}