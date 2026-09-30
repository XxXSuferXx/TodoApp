import { useState } from "react";

interface UseInputResult {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
}

function useInput(initialValue: string = ""): UseInputResult {
    const [text, setText] = useState<string>(initialValue);

    function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
        setText(e.target.value);
    }

    function reset() {
        setText(initialValue);
    }

    return { value: text, onChange: handleTextChange, reset };
}

export default useInput;