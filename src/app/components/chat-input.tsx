import {
  PromptInput,
  PromptInputTextarea,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { UI_MESSAGES } from "@/lib/consts";

interface ChatInputProps {
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export function ChatInput({ input, onInputChange, onSubmit, isLoading }: ChatInputProps) {
  const inputTrimmed = input.trim();
  const inputSubmitIsDisabled = isLoading || inputTrimmed === "";

  return (
    <PromptInput onSubmit={onSubmit} className="relative pr-8">
      <PromptInputTextarea
        placeholder={UI_MESSAGES.PLACEHOLDERS.INPUT}
        value={input}
        onChange={onInputChange}
        disabled={isLoading}
      />
      <PromptInputSubmit disabled={inputSubmitIsDisabled} className="absolute bottom-2 right-2" />
    </PromptInput>
  )
}
