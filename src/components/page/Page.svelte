<script lang="ts">
    let {title, description, Content} = $props();
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<div id="layout">
    <div id="container">
        <h1>{title}</h1>
        {#if description}
            <p>{description}</p>
        {/if}
        <Content />
    </div>
</div>

<style lang="scss">
    h1, p {
        color: var(--primary-text-color);
    }
    #layout {
        display: flex;
        min-height: 100vh;
        padding-bottom: 90px; /* navbar height */
    }
    #container {
        flex: 1;
        width: 100%;
        margin: 0 auto 0 90px;
        padding: 75px 5%;
    }
    h1 {
        font-size: 2.5rem;
        margin-bottom: 1.25rem;
    }

    @media (max-width: 600px) {
        #container {
            margin: 0 auto;
        }
    }
</style>
