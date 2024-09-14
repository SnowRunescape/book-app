import merge from 'deepmerge';
import toast, { ToastOptions } from 'react-hot-toast';
import { defaultOptions, styles } from './constants';
import { NotificationTypes } from './types';

export const notification = (message: string, type: NotificationTypes = 'default') => {
  const opts: ToastOptions = merge(defaultOptions, styles[type]);

  toast(message, opts);
}
