import { XIcon } from 'lucide-react';
import { toast as sonnerToast } from 'sonner';

export interface ToastProps {
  id: string | number;
  title?: string;
  description?: string;
  variant: 'success' | 'error' | 'default';
}

/** I recommend abstracting the toast function
 *  so that you can call it without having to use toast.custom everytime. */
export function toast(toast: Omit<ToastProps, 'id'>) {
  return sonnerToast.custom(id => (
    <Toast id={id} title={toast.title} description={toast.description} variant={toast.variant} />
  ));
}

/** A fully custom toast that still maintains the animations and interactions. */
function Toast(props: ToastProps) {
  const { title, description, variant, id } = props;

  const bg = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    default: 'bg-gray-59',
  };

  return (
    <div className={`flex rounded ${bg[variant]} w-full md:max-w-[400px] items-start py-2 px-4`}>
      <div className="flex flex-1 items-center">
        <div className="w-full">
          <p className="text-sm font-medium text-white">{title}</p>
          <p className="mt-1 text-sm text-white/85">{description}</p>
        </div>
      </div>
      <div className="ml-5 shrink-0 rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden">
        <button
          className="p-1 text-sm text-white/75 hover:text-white"
          onClick={() => {
            sonnerToast.dismiss(id);
          }}>
          <XIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}
