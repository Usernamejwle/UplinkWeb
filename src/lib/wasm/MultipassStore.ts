import { get, writable, type Writable } from "svelte/store"
import * as wasm from "warp-wasm"
import { WarpStore } from "./WarpStore"
import { ULog } from "../../ulog"
import { WarpError, handleErrors } from "./HandleWarpErrors"
import { failure, success, type Result } from "$lib/utils/Result"

class MultipassStore {
    private multipassWritable: Writable<wasm.MultiPassBox | null>
    private identity: Writable<wasm.Identity | null> = writable(null)

    constructor(multipass: Writable<wasm.MultiPassBox | null>) {
        this.multipassWritable = multipass
    }

    async createIdentity(username: string, statusMessage: string, passphrase: string | undefined): Promise<void> {
        ULog.debug('Started creating identity')
        const multipass = get(this.multipassWritable)

        if (multipass) {
            try {
                await multipass.create_identity(username, passphrase)
                await this.updateStatusMessage(statusMessage)
                const identity = get(this.identity)
                ULog.info(`New account created. \n
                Username: ${identity?.username()} \n 
                StatusMessage: ${identity?.status_message()} \n
                Did Key: ${identity?.did_key()} \n`)
            } catch (error) {
                ULog.error('Error creating identity: ', error)
            }
        }
    }

    async sendFriendRequest(did: string): Promise<Result<WarpError, void>> {
        const multipass = get(this.multipassWritable)

        if (multipass) {
            try {
                ULog.debug('Sending friend request to: ', did)
                return success(await multipass.send_request(did))
            } catch (error) {
                return failure(handleErrors(error))
            }
        } else {
            return failure(WarpError.MULTIPASS_NOT_FOUND)
        }
    }

    async acceptFriendRequest(did: string): Promise<Result<WarpError, void>> {
        const multipass = get(this.multipassWritable)

        if (multipass) {
            try {
                return success(await multipass.accept_request(did))
            } catch (error) {
                ULog.error('Error accepting friend request: ', error)
                return failure(handleErrors(error))
            }
        }
        return failure(WarpError.MULTIPASS_NOT_FOUND)
    }

    async denyFriendRequest(did: string): Promise<Result<WarpError, void>> {
        const multipass = get(this.multipassWritable)

        if (multipass) {
            try {
                return success(await multipass.deny_request(did))
            } catch (error) {
                ULog.error('Error denying friend request: ', error)
                return failure(handleErrors(error))
            }
        }
        return failure(WarpError.MULTIPASS_NOT_FOUND)
    }


    async listIncomingFriendRequests(): Promise<any> {
        const multipass = get(this.multipassWritable)

        if (multipass) {
            try {
                let friends = await multipass.list_incoming_request()
                ULog.info(`Listed incoming friend requests: ${friends}`)
                return friends
            } catch (error) {
                ULog.error('Error list incoming friend requests: ', error)
                return []
            }
        }
    }

    async listOutgoingFriendRequests(): Promise<any> {
        const multipass = get(this.multipassWritable)

        if (multipass) {
            try {
                let friends = await multipass.list_outgoing_request()
                ULog.info(`Listed outgoing friend requests: ${friends}`)
                return friends
            } catch (error) {
                ULog.error('Error list outgoing friend requests: ', error)
                return []
            }
        }
    }

    async getOwnIdentity(): Promise<Result<WarpError, wasm.Identity>> {
        const multipass = get(this.multipassWritable)

        if (multipass) {
            try {
                const identity = await multipass.get_own_identity()
                return success(identity)
            } catch (error) {
                ULog.error('Error getting own identity: ', error)
                return failure(handleErrors(error))
            }
        }
        return failure(WarpError.MULTIPASS_NOT_FOUND);
    }

    async updateUsername(new_username: string) {
        const multipass = get(this.multipassWritable)

        if (multipass) {
            await multipass.update_identity(wasm.IdentityUpdate.Username, new_username)
            await this._updateIdentity()
        }
    }

    async updateStatusMessage(newStatusMessage: string) {
        const multipass = get(this.multipassWritable)

        if (multipass) {
            await multipass.update_identity(wasm.IdentityUpdate.StatusMessage, newStatusMessage)
            await this._updateIdentity()
        }
    }

    async updateProfilePhoto(newPictureBase64: string) {
        const multipass = get(this.multipassWritable)

        if (multipass) {
            const buffer = Buffer.from(newPictureBase64, 'base64')
            let pictureAsBytes = new Uint8Array(buffer)
            await multipass.update_identity(wasm.IdentityUpdate.Picture, pictureAsBytes)
            await this._updateIdentity()
        }
    }

    async updateBannerPicture(newPictureBase64: string) {
        const multipass = get(this.multipassWritable)

        if (multipass) {
            const buffer = Buffer.from(newPictureBase64, 'base64')
            let pictureAsBytes = new Uint8Array(buffer)
            await multipass.update_identity(wasm.IdentityUpdate.Banner, pictureAsBytes)
            await this._updateIdentity()
        }
    }

    private async _updateIdentity() {
        const multipass = get(this.multipassWritable)

        if (multipass) {
            try {
                const updated_identity = await multipass.get_own_identity()
                this.identity.update(() => updated_identity)
                ULog.info(`Identity updated\n 
                  Username: ${updated_identity.username()} \n
                  StatusMessage: ${updated_identity.status_message()} \n`)
            } catch (error) {
                ULog.error('Error updating identity: ', error)
            }
        }
    }
}

export const MultipassStoreInstance = new MultipassStore(WarpStore.warp.multipass);
