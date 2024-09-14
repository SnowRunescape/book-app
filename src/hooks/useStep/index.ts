import { useState } from "react";

const useStep = (initialState: number = 0) => {
  const [step, setStep] = useState(initialState);

  const prev = () => setStep((s) => (s > 0 ? s - 1 : s));
  const next = () => setStep((s) => s + 1);

  return {
    step,
    setStep,
    prev,
    next,
  }
};

export default useStep;
