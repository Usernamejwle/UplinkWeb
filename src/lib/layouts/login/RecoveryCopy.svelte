<script lang="ts">
    import { OrderedPhrase } from "$lib/components"
    import Controls from "$lib/layouts/Controls.svelte"
    import { Button, Icon, Text, Title } from "$lib/elements"
    import { Appearance, Shape } from "$lib/enums"

    import { _ } from "svelte-i18n"
    import { createEventDispatcher } from "svelte"
    import { TesseractStoreInstance } from "$lib/wasm/TesseractStore"
    import { isAndroidOriOS } from "$lib/utils/Mobile"
    import { Share } from "@capacitor/share"
    import { log } from "$lib/utils/Logger"

    const dispatch = createEventDispatcher()

    let phrase = TesseractStoreInstance.fetchSeed()?.split(" ")
    let loading = false

    // Function to handle downloading the seed phrase as a txt file
    async function downloadPhrase() {
        if (!phrase) return

        // Join the phrase array into a single string
        const phraseText = phrase.join(" ")

        if (isAndroidOriOS()) {
            await sharePhraseIfMobile(phraseText)
            return
        }

        const blob = new Blob([phraseText], { type: "text/plain" })

        const link = document.createElement("a")

        link.href = URL.createObjectURL(blob)
        link.download = "seed-phrase.txt" // Filename for the download
        link.click()

        URL.revokeObjectURL(link.href)
    }

    async function sharePhraseIfMobile(phraseText: string) {
        try {
            await Share.share({
                title: $_("pages.auth.recovery.title"),
                text: phraseText,
                dialogTitle: $_("pages.auth.recovery.share"),
            })

            log.info("Seed phrase shared successfully")
        } catch (error) {
            log.error("Error to share seed phrase:", error)
        }
    }
</script>

<div id="auth-recover">
    <div class="header">
        <Title hook="title-recovery-page">{$_("pages.auth.recovery.title")}</Title>
        <Text hook="text-recovery-page-warning" muted>{$_("pages.auth.recovery.save_warning")}</Text>
    </div>
    {#if phrase}
        {#each phrase as word, i}
            <OrderedPhrase number={i + 1} word={word} loading={loading} />
        {/each}
    {/if}
    <Controls>
        <Button hook="button-download-phrase" class="full-width" text={$_("pages.auth.recovery.download")} appearance={Appearance.Alt} loading={loading} on:click={downloadPhrase}>
            <Icon icon={Shape.Download} />
        </Button>
        <Button
            hook="button-save-phrase"
            class="full-width"
            text={$_("pages.auth.recovery.next_step")}
            loading={loading}
            on:click={_ => {
                loading = true
                dispatch("click")
            }}>
            <Icon icon={Shape.ArrowRight} />
        </Button>
    </Controls>
</div>

<style lang="scss">
    #auth-recover {
        align-self: center;
        align-content: center;
        justify-content: center;
        display: inline-flex;
        flex-direction: row;
        gap: var(--gap);
        padding: var(--padding);
        max-width: var(--max-component-width);
        flex-wrap: wrap;
        flex: 1;

        .header {
            width: 100%;
            text-align: center;
            display: inline-flex;
            flex-direction: column;
            gap: var(--gap);
        }
    }
</style>
