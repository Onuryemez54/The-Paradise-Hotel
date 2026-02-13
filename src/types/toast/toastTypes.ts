export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
}

export type ToastItemType = {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  progress?: boolean;
  leaving?: boolean;

  onRequestClose: () => void;
  onRemove: () => void;
};
