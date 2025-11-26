<script lang="ts">
    import { ChevronLeft } from '@lucide/svelte';
</script>

<a href="/">
    <ChevronLeft strokeWidth="1.6" color="currentColor" />
</a>

<style lang="scss">
    a {
        display: none;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        position: fixed;
        top: 16px;
        left: 16px;
        border-radius: 50%;
        background-color: var(--secondary-color);
        color: var(--secondary-text-color);
        transition: color 0.15s;

        &:hover {
            color: var(--primary-text-color);
        }
    }

    @media (max-width: 600px) {
        a {
            display: flex;
        }
    }
</style>
