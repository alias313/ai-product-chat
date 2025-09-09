export interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    image?: string;
    imageLoading?: string;
}

export interface GeneratedImage {
    base64Data: string;
    mediaType: string;
    uint8ArrayData?: Uint8Array;
}
