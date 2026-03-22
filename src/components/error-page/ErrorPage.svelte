<script>
    import { page } from '$app/state';
</script>

<div id="wrapper">
    <p id="error-message">
        there is no tool to fix this.
        <br>
        404: {page.error?.message || 'An unexpected error occurred.'}
    </p>
</div>

<style lang="scss">
    #wrapper {
        margin: 1rem 0;
    }
    p {
        color: var(--primary-text-color);
        line-height: 1.5rem;
    }
</style>
