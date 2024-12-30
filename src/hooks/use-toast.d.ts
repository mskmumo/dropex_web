declare module '@/hooks/use-toast' {
    export function useToast(): {
      toast: (options: { title: string; description?: string; variant?: string }) => void;
    };
  }