<script lang="ts">
    import { createEventDispatcher, type EventDispatcher } from "svelte"

    export let hidden: boolean = false
    export let clss: string = ""
    export let allowed: string | undefined = undefined
    export let multiple: boolean = true

    const dispatch: EventDispatcher<Record<string, File[]>> = createEventDispatcher()

    let refSelf: HTMLInputElement
    let fileInput: FileList | null

    $: if (fileInput) {
        let files: File[] = []
        for (let file of fileInput) {
            files.push(file)
        }
        dispatch("select", files)
        fileInput = null
        refSelf.value = ""
    }

    export function click() {
        refSelf.click()
    }
</script>

<input class={clss} style={hidden ? "display: none" : ""} multiple={multiple} accept={allowed ? allowed : "*"} type="file" bind:this={refSelf} bind:files={fileInput} />
