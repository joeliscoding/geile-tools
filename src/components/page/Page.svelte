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
        text-align: center;
    }
    #layout {
        display: flex;
        height: 100vh;
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

    @media (max-width: 500px) {
        #container {
            margin: 0 auto;
        }
    }
</style>
