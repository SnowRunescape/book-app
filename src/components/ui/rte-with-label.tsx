import * as React from "react"

import RichTextEditor from "@/components/Rte"
import { Label } from "./label"

export interface RteWithLabelProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    label: string,
  }

const RteWithLabel = React.forwardRef<HTMLTextAreaElement, RteWithLabelProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">{label}</Label>
        <RichTextEditor ref={ref} {...props} />
      </div>
    )
  }
)
RteWithLabel.displayName = "RteWithLabel"

export { RteWithLabel }

