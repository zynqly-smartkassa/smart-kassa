import { AnimatePresence, motion } from "framer-motion";
import { EyeClosed, Eye } from "lucide-react";
import { Label } from "./ui/label";
import { InputGroup, InputGroupInput, InputGroupAddon } from "./ui/input-group";
import type { PasswordContainer } from "../../constants/Compontents";
import { resizeKeyboard } from "../hooks/keyboardResizer";

interface PasswordInputsProps {
  PasswordContainer: PasswordContainer[];
  classname?: string;
}

const PasswordInputs = ({
  PasswordContainer,
  classname,
}: PasswordInputsProps) => {
  return (
    <div
      className={
        !classname ? "grid grid-cols-1 md:grid-cols-2 gap-6" : classname
      }
    >
      {PasswordContainer.map((value, index) => (
        <div key={index}>
          <Label htmlFor={value.id}>{value.label}</Label>

          <InputGroup className={value.className}>
            <InputGroupInput
              id={value.id}
              type={value.showPassword ? "text" : "password"}
              title="Über 6 Zeichen mit einer Zahl und einem Zeichen"
              placeholder={value.placeholder}
              required
              value={value.value}
              onChange={(e) => value.onChangeListener(e.target.value)}
              onBlur={value.onBlurListener}
              onClick={() => resizeKeyboard()}
              data-testid={value.id}
              autoComplete={value.autocomplete}
            />

            <InputGroupAddon align="inline-end">
              <div
                onClick={() => value.setShowPassword((prev) => !prev)}
                data-testid="password-toggle"
                className="cursor-pointer"
              >
                {value.showPassword ? (
                  <EyeClosed width={19} />
                ) : (
                  <Eye width={19} className="text-zinc-700" />
                )}
              </div>
            </InputGroupAddon>
          </InputGroup>
          {value.validation.map((v, i) => (
            <AnimatePresence key={i}>
              {v && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-red-500 text-sm"
                >
                  {value.validationMessage[i]}
                </motion.p>
              )}
            </AnimatePresence>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PasswordInputs;
