<script lang="ts">
    let {path, title, id, Icon} = $props();
</script>

<a href={path} class="navbar-tab" {id}>
    <Icon strokeWidth="1.6" />
    <p>{title}</p>
</a>

<style lang="scss">
    a {
        color: var(--secondary-text-color);
        transition: color 0.15s;
        margin: 25px 0;
        display: block;
        font-size: 0.7rem;
        text-align: center;
        text-decoration: none;

        &:hover {
            color: var(--primary-text-color);
        }
    }

    p {
        margin: 5px;
    }

    @media (max-width: 500px) {
        #logo {
            display: none;
        }
        a {
            flex-direction: column;
            align-items: center;
            margin: auto 5px;
            width: 75px;
        }
    }
</style>
