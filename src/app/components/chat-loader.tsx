import { Message, MessageContent } from "@/components/ai-elements/message"
import { Loader } from "@/components/ai-elements/loader"

export function ChatLoader() {
    return (
        <Message from="assistant">
            <MessageContent>
                <div className="flex items-center gap-2">
                    <Loader />
                    <p className="text-sm text-gray-500">Loading product...</p>
                </div>
            </MessageContent>
        </Message>
    )
}
