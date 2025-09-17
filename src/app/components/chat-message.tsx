import { Message, MessageContent } from "@/components/ai-elements/message"
import { type Message as MessageType } from "@/lib/types"
import { Image } from "@/components/ai-elements/image"

export function ChatMessage({ message }: { message: MessageType }) {
  const { role, content, image } = message;
  return (
    <Message from={role}>
      <MessageContent>
        {content}
        {image && (
          <Image
            base64={image.base64Data}
            mediaType={image.mediaType}
            uint8Array={new Uint8Array()}
            alt="Product image"
            className="w-full h-auto"
          />
        )}
      </MessageContent>
    </Message>
  )
}
