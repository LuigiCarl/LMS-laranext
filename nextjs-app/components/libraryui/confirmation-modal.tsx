"use client"

import { motion } from "motion/react"
import { X, AlertCircle, Check } from "lucide-react"

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  type?: "warning" | "info" | "success"
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "info",
}: ConfirmationModalProps) {
  if (!isOpen) return null

  const getIconColor = () => {
    switch (type) {
      case "warning":
        return "text-amber-500"
      case "success":
        return "text-green-500"
      default:
        return "text-blue-500"
    }
  }

  const getIcon = () => {
    switch (type) {
      case "warning":
        return <AlertCircle className={`w-6 h-6 ${getIconColor()}`} />
      case "success":
        return <Check className={`w-6 h-6 ${getIconColor()}`} />
      default:
        return <AlertCircle className={`w-6 h-6 ${getIconColor()}`} />
    }
  }

  const getConfirmButtonStyle = () => {
    switch (type) {
      case "warning":
        return "bg-amber-600 hover:bg-amber-700 text-white"
      case "success":
        return "bg-green-600 hover:bg-green-700 text-white"
      default:
        return "bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-900"
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl w-full max-w-md overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg font-medium">{title}</h2>
            <button onClick={onClose} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4">
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-0.5">{getIcon()}</div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">{message}</p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 p-4 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-200 dark:border-zinc-800">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm()
                onClose()
              }}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${getConfirmButtonStyle()}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </motion.div>
    </>
  )
}
