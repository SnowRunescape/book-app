import { ToastOptions } from 'react-hot-toast';
import { NotificationTypes } from './types';

export const defaultOptions: ToastOptions = {
  position: "bottom-center",
  style: {
    color: "#fff",
  }
};

export const styles: Record<NotificationTypes, ToastOptions> = {
  "default": {

  },
  "success": {
    style: {
      background: '#28a745',
    }
  },
  "warning": {
    style: {
      background: '#ffbb33',
    }
  },
  "error": {
    style: {
      background: '#e74c3c',
    }
  }
};
