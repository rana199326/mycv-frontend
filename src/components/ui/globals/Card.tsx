import { FC } from 'react';


const NotificationCard = () => {
  const notifications = [
    {
      id: 1,
      message: 'Your call has been confirmed.',
      time: '1 hour ago'
    },
    {
      id: 2,
      message: 'You have a new message!',
      time: '1 hour ago'
    },
    {
      id: 3,
      message: 'Your subscription is expiring soon!',
      time: '2 hours ago'
    }
  ];

  return (
    <div className="w-80 bg-white rounded-lg shadow-lg p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <p className="text-sm text-gray-500">You have 3 unread messages.</p>
      </div>

      <div className="p-3 mb-4 flex items-center justify-between border rounded-lg">
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
          <div>
            <p className="text-sm font-medium">Push Notifications</p>
            <p className="text-xs text-gray-500">Send notifications to device.</p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
        </label>
      </div>

      <div className="space-y-4">
        {notifications.map(notification => (
          <div key={notification.id} className="flex gap-3">
            <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
            <div>
              <p className="text-sm">{notification.message}</p>
              <span className="text-xs text-gray-500">{notification.time}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 bg-gray-900 text-white rounded-lg text-sm flex items-center justify-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Mark all as read
      </button>
    </div>
  );
};


export default NotificationCard;