import { AnimatePresence, motion } from "framer-motion";
import type { Container } from "../../constants/Compontents";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { resizeKeyboard } from "../hooks/keyboardResizer";

interface NameInputsProps {
  Containers: Container[];
  classname?: string;
}

const NameInputs = ({ Containers, classname }: NameInputsProps) => {
  return (
    <div
      className={
        !classname ? "grid grid-cols-1 md:grid-cols-2 gap-6" : classname
      }
    >
      {Containers.map((value, index) => (
        <div key={index}>
          <Label htmlFor={value.id}>{value.label}</Label>
          <Input
            id={value.id}
            className={value.className}
            type="text"
            placeholder={value.placeholder}
            required
            value={value.value}
            onChange={(e) => value.onChangeListener(e.target.value)}
            onBlur={value.onBlurListener}
            onFocus={value.onFocusListener}
            onClick={() => resizeKeyboard()}
            data-testid={value.id}
            autoComplete={value.autocomplete}
          />
          <AnimatePresence>
            {value.validation && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-red-500 text-sm"
              >
                {value.validationMessage}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default NameInputs;
