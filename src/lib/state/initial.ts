import type { Call, Chat, FileInfo, FriendRequest, PaymentTracker, User } from "$lib/types"
import type { Writable } from "svelte/store"
import type { ToastMessage } from "./ui/toast"
import type { VoiceRTCUser } from "$lib/media/Voice"

export interface IState {
    user: Writable<User>
    blocked: Writable<string[]>
    activeRequests: Writable<FriendRequest[]>
    friends: Writable<string[]>
    favorites: Writable<Chat[]>
    files: Writable<FileInfo[]>
    openFolders: Writable<Record<string, boolean>>
    devices: {
        muted: Writable<boolean>
        deafened: Writable<boolean>
        input: Writable<string>
        output: Writable<string>
        cameraEnabled: Writable<boolean>
        video: Writable<string>
        screenShare: Writable<boolean>
    }
    activeChat: Writable<Chat>
    chatMessagesToSend: Writable<{ [key: string]: string }>
    chatAttachmentsToSend: Writable<{
        [key: string]: {
            localFiles: [File?, string?][]
            storageFiles: FileInfo[]
        }
    }>
    activeCall: Writable<Call | null>
    activeCallMeta: Writable<{ [key: string]: { user: VoiceRTCUser; stream: MediaStream | null } | undefined }>
    pendingCall: Writable<Call | null>
    toasts: Writable<{ [key: string]: [ToastMessage, NodeJS.Timeout] }>
    // A cache of all fetched user data
    // We use a Writable<User> to also allow easy subscription to changes if only that user interests us
    userCache: Writable<{ [key: string]: Writable<User> }>
    paymentTracker: Writable<PaymentTracker[]>
    pageState: Writable<string>
}
