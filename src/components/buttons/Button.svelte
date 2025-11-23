<script lang="ts">
    let { text, id, event } = $props();
</script>

<button id={id} onclick={event}>{text}</button>

<style lang="scss">
    button {
        margin: 10px 0;
        color: var(--primary-color);
        padding: 10px 20px;
        background-color: var(--secondary-text-color);
        transition: background-color 0.15s;
    }

    button:hover {
        cursor: pointer;
        background-color: var(--primary-text-color);
    }
</style>
