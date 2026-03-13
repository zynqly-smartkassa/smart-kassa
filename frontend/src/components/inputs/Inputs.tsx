import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { resizeKeyboard } from "../../hooks/layout/keyboardResizer";

export interface FormFieldProps extends React.ComponentProps<"input"> {
  /** Field label rendered above the input. */
  label: string;
  /** Error message shown below the input (animated). */
  error?: string;
}

/**
 * A labelled input field with an animated validation error message.
 * Uses forwardRef so it works directly with react-hook-form's `register()`.
 */
const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, id, onClick, className, ...props }, ref) => (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        ref={ref}
        className={error ? `border-2 border-red-500${className ? ` ${className}` : ""}` : className}
        onClick={(e) => {
          resizeKeyboard();
          onClick?.(e);
        }}
        {...props}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-red-500 text-sm"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  ),
);

FormField.displayName = "FormField";

export default FormField;
