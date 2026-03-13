import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EyeClosed, Eye } from "lucide-react";
import { Label } from "../ui/label";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "../ui/input-group";
import { resizeKeyboard } from "../../hooks/layout/keyboardResizer";

export interface FormPasswordFieldProps extends Omit<React.ComponentProps<"input">, "type"> {
  /** Label rendered above the input. Omit when rendering an external label. */
  label?: string;
  /** Error message shown below the input (animated). */
  error?: string;
  /** Whether the password text is currently visible. */
  showPassword: boolean;
  /** Callback to toggle password visibility. */
  onTogglePassword: () => void;
}

/**
 * A password input with a show/hide toggle and animated validation error.
 * Uses forwardRef so it works directly with react-hook-form's `register()`.
 */
const FormPasswordField = React.forwardRef<HTMLInputElement, FormPasswordFieldProps>(
  ({ label, error, showPassword, onTogglePassword, id, onClick, className, ...props }, ref) => (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}
      <InputGroup className={error ? `border-2 border-red-500${className ? ` ${className}` : ""}` : className}>
        <InputGroupInput
          id={id}
          ref={ref}
          type={showPassword ? "text" : "password"}
          onClick={(e) => {
            resizeKeyboard();
            onClick?.(e);
          }}
          {...props}
        />
        <InputGroupAddon align="inline-end">
          <div
            onClick={onTogglePassword}
            data-testid="password-toggle"
            className="cursor-pointer"
          >
            {showPassword ? (
              <EyeClosed width={19} />
            ) : (
              <Eye width={19} className="text-zinc-700" />
            )}
          </div>
        </InputGroupAddon>
      </InputGroup>
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

FormPasswordField.displayName = "FormPasswordField";

export default FormPasswordField;
