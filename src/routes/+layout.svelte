<script lang="ts">
    import favicon from '$lib/assets/favicon.svg';
    import '$styles/global.scss';
    import Navbar from '$components/navbar/Navbar.svelte';
    import MobileBackButton from '$components/mobile-back-button/MobileBackButton.svelte';
    import { page } from '$app/state';

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

{#if page.url.pathname !== '/'}
    <MobileBackButton />
{/if}
<Navbar />

{@render children()}

<style lang="scss">
    :global(body) {
        background-color: var(--primary-color);
    }
</style>
