export type ToastType = 'success' | 'error' | 'info' | 'warning';

export type ToastItemType = {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  progress?: boolean;
  onClose: () => void;
};
