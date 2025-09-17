import { Message, MessageContent } from "@/components/ai-elements/message"
import { Response } from "@/components/ai-elements/response"
import { type Message as MessageType } from "@/lib/types"
import { Image } from "@/components/ai-elements/image"
import { Loader } from "@/components/ai-elements/loader";

import { UI_MESSAGES } from "@/lib/consts";

export function ChatMessage({ message }: { message: MessageType }) {
  const { role, content, image, imageLoading } = message;
  return (
    <Message from={role}>
      <MessageContent>
        <picture className="w-full max-w-2xl aspect-video overflow-hidden rounded-md">
          {
            imageLoading && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="flex mb-4 space-x-2">
                  <Loader />
                  <span>{UI_MESSAGES.LOADING.IMAGE}</span>
                </div>
              </div>
            )
          }

          {image && (
              <Image
                base64={image.base64Data}
                mediaType={image.mediaType}
                uint8Array={new Uint8Array()}
                alt="Product image"
                className="w-full h-full object-cover object-center"
              />
          )}
        </picture> 
        <Response>
          {content}
        </Response>
      </MessageContent>
    </Message>
  )
}
