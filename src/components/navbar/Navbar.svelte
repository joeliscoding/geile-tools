<script lang="ts">
    import { Share } from '@lucide/svelte';
    import { Image } from '@lucide/svelte';
    import { Info } from '@lucide/svelte';
    import GitHub from '$components/icons/GitHub.svelte';
    import Logo from '$components/icons/Logo.svelte';
    import NavbarTab from '$components/navbar/NavbarTab.svelte';
</script>

<div id="navigation-bar">
    <nav>
        <div id="top-links">
            <NavbarTab path="/" title="geile.tools" id="logo" Icon={Logo} />
            <NavbarTab path="/share" title="share" id="share" Icon={Share} />
            <NavbarTab path="/img" title="img" id="img" Icon={Image} />
        </div>

        <div id="bottom-links">
            <NavbarTab
                id="github"
                path="https://github.com/joeliscoding/geile-tools"
                title="GitHub"
                Icon={GitHub}
            />
            <NavbarTab path="/about" title="about" id="about" Icon={Info} />
        </div>
    </nav>
</div>

<style lang="scss">
    #navigation-bar {
        position: fixed;
        width: 90px;
        height: 100%;
        background-color: var(--secondary-color);
        left: 0;
        top: 0;
    }

    #top-links {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
    }

    #bottom-links {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
    }

    /* mobile */

    @media (max-width: 600px) {
        #navigation-bar {
            height: 90px;
            width: 100%;
            position: fixed;
            bottom: 0;
            top: auto;
            display: flex;
            justify-content: center;
        }
        nav {
            display: flex;
            justify-content: center;
        }
        #top-links,
        #bottom-links {
            position: static;
            display: flex;
        }
    }
</style>
