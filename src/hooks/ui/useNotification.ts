import { useToast } from "@/hooks/ui/use-toast"
import { useCallback } from "react"

interface NotificationProps {
  type?: "success" | "error" | "warning" | "info"
  title?: string
  message: string
}

export const useNotification = () => {
  const { toast } = useToast()

  const notify = useCallback(({ title, message, type = "info" }: NotificationProps) => {
    const variants = {
      success: "default",
      error: "destructive",
      warning: "default",
      info: "default"
    } as const

    toast({
      title: title,
      description: message,
      variant: variants[type],
      duration: 5000,
    })
  }, [toast])

  return {
    notifySuccess: (props: Omit<NotificationProps, "type">) =>
      notify({ ...props, type: "success" }),
    notifyError: (props: Omit<NotificationProps, "type">) =>
      notify({ ...props, type: "error" }),
    notifyWarning: (props: Omit<NotificationProps, "type">) =>
      notify({ ...props, type: "warning" }),
    notifyInfo: (props: Omit<NotificationProps, "type">) =>
      notify({ ...props, type: "info" })
  }
} 