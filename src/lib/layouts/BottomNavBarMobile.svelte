<script lang="ts">
    import { Keyboard } from "@capacitor/keyboard"
    import { page } from "$app/stores"
    import { Button, Icon, Text } from "$lib/elements"
    import { Appearance, CommunitySettingsRoute, Route, SettingsRoute } from "$lib/enums"
    import { VoiceRTCInstance } from "$lib/media/Voice"
    import { SettingsStore } from "$lib/state"
    import { Store } from "$lib/state/Store"
    import { UIStore } from "$lib/state/ui"
    import type { FriendRequest, NavRoute } from "$lib/types"
    import { checkMobile, isAndroidOriOS } from "$lib/utils/Mobile"
    import { createEventDispatcher, onDestroy, onMount } from "svelte"
    import { get } from "svelte/store"
    import { afterNavigate, onNavigate } from "$app/navigation"
    import type { PluginListenerHandle } from "@capacitor/core"

    export let routes: NavRoute[] = []
    export let activeRoute: Route | SettingsRoute | CommunitySettingsRoute = Route.Home
    export let icons: boolean = false
    export let vertical: boolean = false

    let incomingRequests: FriendRequest[] = []
    let totalUnreads: number = 0
    let badgeCounts: Record<string, number> = {}

    const dispatch = createEventDispatcher()

    // Subscribe to stores and update local state
    const unsubscribeStore = Store.state.activeRequests.subscribe(r => {
        incomingRequests = Store.inboundRequests(r)
        updateBadgeCounts()
    })

    const unsubscribeUIStore = UIStore.state.chats.subscribe(() => {
        totalUnreads = UIStore.getTotalNotifications()
        updateBadgeCounts()
    })

    function updateBadgeCounts() {
        badgeCounts = {}
        for (const route of routes) {
            badgeCounts[route.to] = calculateBadgeCount(route.to)
        }
    }

    function calculateBadgeCount(route: string): number {
        if (route === "/friends") {
            return incomingRequests.length
        } else if (route === "/chat") {
            return totalUnreads
        }
        return 0
    }

    function handleNavigate(route: NavRoute) {
        if (checkMobile() && !overrides(route)) UIStore.state.sidebarOpen.set(false)
        if (isAndroidOriOS() && (route.to === Route.Settings || (route.to === Route.Chat && get(UIStore.state.chats).length > 0))) {
            if (get(UIStore.state.sidebarOpen) === false) {
                UIStore.toggleSidebar()
                // Avoid keyboard when navigate to chat preview list
            }
        }
        dispatch("navigate", route.to.toString())
    }

    function overrides(route: NavRoute) {
        if (route.to === Route.Chat && $settings.messaging.quick) {
            return true
        }
        if (route.to === Route.Settings) return true
    }

    UIStore.state.sidebarOpen.subscribe(open => {
        showBottomNavBar = checkIfCanShowBottomNavBar(open, null, false)
    })

    onNavigate(async e => {
        const routeId = e.to?.route.id
        showBottomNavBar = checkIfCanShowBottomNavBar(get(UIStore.state.sidebarOpen), routeId, false)
    })

    function checkIfCanShowBottomNavBar(sidebarOpen: boolean, routeId: string | null | undefined, isMobileKeyboardOpened: boolean): boolean {
        let currentRoute = routeId ?? $page.route.id

        if (isAndroidOriOS() && !isMobileKeyboardOpened) {
            if (currentRoute === "/chat" && sidebarOpen) {
                return true
            }
            if (currentRoute === "/friends") {
                return true
            }
            if (currentRoute?.includes("/settings")) {
                return true
            }
            if (currentRoute === "/files") {
                return true
            }
        }
        return false
    }

    $: showBottomNavBar = checkIfCanShowBottomNavBar(get(UIStore.state.sidebarOpen), null, false)

    let mobileKeyboardListener01: PluginListenerHandle | undefined
    let mobileKeyboardListener02: PluginListenerHandle | undefined

    onMount(async () => {
        if (isAndroidOriOS()) {
            mobileKeyboardListener01 = await Keyboard.addListener("keyboardWillShow", () => {
                showBottomNavBar = checkIfCanShowBottomNavBar(get(UIStore.state.sidebarOpen), null, true)
            })

            mobileKeyboardListener02 = await Keyboard.addListener("keyboardWillHide", () => {
                showBottomNavBar = checkIfCanShowBottomNavBar(get(UIStore.state.sidebarOpen), null, false)
            })
        }
    })

    // Clean up subscriptions when component is destroyed
    onDestroy(async () => {
        setTimeout(() => {
            if (get(Store.state.activeCall)) {
                Store.setActiveCall(Store.getCallingChat(VoiceRTCInstance.channel!)!)
            }
        }, 100)

        unsubscribeStore()
        unsubscribeUIStore()
        await mobileKeyboardListener01?.remove()
        await mobileKeyboardListener02?.remove()
    })
    $: settings = SettingsStore.state
</script>

{#if showBottomNavBar}
    <div id="bottom-nav-bar-mobile" class="navigation {vertical ? 'vertical' : 'horizontal'} {icons ? 'icons' : ''}">
        {#each routes as route}
            <div class="navigation-control {!icons ? 'fill' : ''}">
                <Button
                    hook="button-{route.name}"
                    badge={badgeCounts[route.to]}
                    fill={!icons}
                    tooltip={route.name}
                    icon={icons}
                    outline={activeRoute !== route.to && !icons}
                    appearance={activeRoute === route.to ? Appearance.Primary : Appearance.Alt}
                    on:click={() => handleNavigate(route)}>
                    <Icon alt={activeRoute === route.to} icon={route.icon} />
                    {#if !icons}
                        <Text appearance={activeRoute !== route.to ? Appearance.Default : Appearance.Alt}>{route.name}</Text>
                    {/if}
                </Button>
            </div>
        {/each}
    </div>
{/if}

<style lang="scss">
    .navigation {
        display: inline-flex;
        gap: var(--gap);
        justify-content: space-evenly;
        width: 100%;
        border-top: 1px solid var(--border-color, #ccc);
        box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        z-index: 1000;
        position: sticky;
        bottom: 0;
        left: 0;
        right: 0;
        padding: var(--padding, 10px);

        &.vertical {
            flex-direction: column;
        }

        .navigation-control {
            display: inline-flex;
            flex-direction: column;
            align-items: center;

            &.fill {
                flex: 1;

                :global(.text) {
                    justify-content: space-between;
                }
            }
        }
    }

    @media only screen and (max-width: 600px) {
        .navigation {
            padding-bottom: var(--padding, 10px);
        }
    }
</style>
