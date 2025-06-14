import * as React from "react";
import {
  Toast as ShadcnToast,
  ToastAction as ShadcnToastAction,
  ToastClose as ShadcnToastClose,
  ToastDescription as ShadcnToastDescription,
  ToastProvider as ShadcnToastProvider,
  ToastTitle as ShadcnToastTitle,
  ToastViewport as ShadcnToastViewport,
} from "@/components/ui/toast";
import { Toaster as ShadcnToaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import * as ToastPrimitive from "@radix-ui/react-toast";

/** Props for CoreToast component */
export interface CoreToastProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> {}

/** Core Toast component */
const Toast = React.forwardRef<
  React.ElementRef<typeof ShadcnToast>,
  CoreToastProps
>(({ className, ...props }, ref) => (
  <ShadcnToast
    ref={ref}
    className={cn("core-toast", className)}
    {...props}
  />
));
Toast.displayName = "CoreToast";

/** Props for CoreToastAction component */
export interface CoreToastActionProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action> {}

/** Core ToastAction component */
const ToastAction = React.forwardRef<
  React.ElementRef<typeof ShadcnToastAction>,
  CoreToastActionProps
>(({ className, ...props }, ref) => (
  <ShadcnToastAction
    ref={ref}
    className={cn("core-toast-action", className)}
    {...props}
  />
));
ToastAction.displayName = "CoreToastAction";

/** Props for CoreToastClose component */
export interface CoreToastCloseProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close> {}

/** Core ToastClose component */
const ToastClose = React.forwardRef<
  React.ElementRef<typeof ShadcnToastClose>,
  CoreToastCloseProps
>(({ className, ...props }, ref) => (
  <ShadcnToastClose
    ref={ref}
    className={cn("core-toast-close", className)}
    {...props}
  />
));
ToastClose.displayName = "CoreToastClose";

/** Props for CoreToastTitle component */
export interface CoreToastTitleProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title> {}

/** Core ToastTitle component */
const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ShadcnToastTitle>,
  CoreToastTitleProps
>(({ className, ...props }, ref) => (
  <ShadcnToastTitle
    ref={ref}
    className={cn("core-toast-title", className)}
    {...props}
  />
));
ToastTitle.displayName = "CoreToastTitle";

/** Props for CoreToastDescription component */
export interface CoreToastDescriptionProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description> {}

/** Core ToastDescription component */
const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ShadcnToastDescription>,
  CoreToastDescriptionProps
>(({ className, ...props }, ref) => (
  <ShadcnToastDescription
    ref={ref}
    className={cn("core-toast-description", className)}
    {...props}
  />
));
ToastDescription.displayName = "CoreToastDescription";

// Re-export remaining components
const ToastProvider = ShadcnToastProvider;
const ToastViewport = ShadcnToastViewport;
const Toaster = ShadcnToaster;

export {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  Toaster,
};