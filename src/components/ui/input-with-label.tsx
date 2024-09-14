import * as React from "react"

import { Input } from "./input"
import { Label } from "./label"

export interface InputWithLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string,
  }

const InputWithLabel = React.forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">{label}</Label>
        <Input ref={ref} {...props} />
      </div>
    )
  }
)
InputWithLabel.displayName = "InputWithLabel"

export { InputWithLabel }

