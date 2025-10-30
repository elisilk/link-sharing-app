export type toast = {
  id: number;
  message: string;
  icon?: string;
  close?: boolean;
  timeout?: number;
  type: "success" | "error" | "info" | "warning";
};

const toasts = ref<toast[]>([]);
let nextToastId = 0;

export function useToastNotifications() {
  const removeToast = (id: number) => {
    toasts.value = toasts.value.filter(toast => toast.id !== id);
  };

  const addToast = (message: string, icon: string = "my-icon:icon-link-copied-to-clipboard", close: boolean = false, timeout: number = 3000, type: toast["type"] = "info") => {
    const id = nextToastId++;
    toasts.value.push({ id, message, icon, close, timeout, type });

    if (timeout > 0) {
      setTimeout(() => removeToast(id), timeout);
    }
  };

  return {
    toasts,
    addToast,
    removeToast,
  };
}
