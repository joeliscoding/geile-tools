<script lang="ts">
    import Button from '$components/buttons/Button.svelte';
    import RadioElement from '$components/forms/RadioElement.svelte';
    import { onMount } from 'svelte';

    const UPLOAD: string = 'UPLOAD';
    const OPTIONS: string = 'OPTIONS';
    const DOWNLOAD: string = 'DOWNLOAD';
    let state = UPLOAD;

    let fileType: string;
    let fileExt: string | undefined;

    let srcImgContainer: HTMLDivElement;
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null;
    onMount(() => {
        srcImgContainer = document.getElementById('src-img-container') as HTMLDivElement;
        canvas = document.getElementById('img-canvas') as HTMLCanvasElement;
        ctx = canvas.getContext('2d');
    });

    let image: HTMLImageElement;
    let imgWidth: number;
    let imgHeight: number;

    const handleImageSelect = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.png, .jpg, .webp';
        input.onchange = (e: Event) => {
            const files = (e.target as HTMLInputElement | null)?.files;
            if (!files || files.length === 0) return;
            const file = files[0];
            image = new Image();
            image.onload = () => {
                state = OPTIONS;
                canvasDrawImg();
            };
            fileType = file.type;
            fileExt = file.name.split('.').pop();
            image.src = URL.createObjectURL(file);
        };
        input.click();
    };

    const canvasDrawImg = () => {
        canvas.style.display = 'inline-block';
        imgWidth = image.naturalWidth;
        imgHeight = image.naturalHeight;
        canvas.width = imgWidth;
        canvas.height = imgHeight;
        if (!ctx) return;
        ctx.drawImage(image, 0, 0);
    };

    const handleApply = () => {
        const selectedOption = document
            .querySelector('input[name="action"]:checked')
            ?.id.split('-')[0];
        switch (selectedOption) {
            case 'autocrop':
                autoCrop();
                break;
            default:
                return;
        }
        state = DOWNLOAD;
    };

    const autoCrop = () => {
        if (!ctx) return;
        const imgData = ctx.getImageData(0, 0, imgWidth, imgHeight).data;

        let top = imgHeight - 1,
            bottom = 0,
            left = imgWidth - 1,
            right = 0;

        for (let y = 0; y < imgHeight; y++) {
            for (let x = 0; x < imgWidth; x++) {
                const alpha = imgData[(y * imgWidth + x) * 4 + 3];
                if (alpha !== 0) {
                    if (y < top) top = y;
                    if (x < left) left = x;
                    if (x > right) right = x;
                    bottom = y;
                }
            }
        }

        let cropWidth = right - left + 1;
        let cropHeight = bottom - top + 1;

        const croppedImageData = ctx.getImageData(left, top, cropWidth, cropHeight);

        canvas.width = cropWidth;
        canvas.height = cropHeight;
        ctx.putImageData(croppedImageData, 0, 0);
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.download = `edited-image.${fileExt}`;
        link.href = canvas.toDataURL(fileType);
        link.click();
        link.remove();
    };

    const handleReset = () => {
        state = UPLOAD;
        canvas.style.display = 'none';
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };
</script>

<div id="wrapper">
    {#if state === UPLOAD}
        <div id="src-img-container">
            <form method="dialog" enctype="multipart/form-data">
                <Button text="select image" id="select-image-button" event={handleImageSelect} />
            </form>
        </div>
    {/if}
    <canvas id="img-canvas"></canvas>
</div>

<div id="tool-form-container">
    <form id="tools-form">
        {#if state === UPLOAD}
            <RadioElement id="placeholder" label="upload an image" disabled={true} />
        {/if}
        {#if state === OPTIONS}
            {#if fileType === 'image/png'}
                <RadioElement id="autocrop" label="auto crop" />
            {/if}
            {#if fileType === 'image/webp'}
                <RadioElement id="autocrop" label="auto crop" />
            {/if}
            {#if fileType === 'image/jpeg'}
                <!-- No jpeg tools available for now -->
            {/if}
            <RadioElement id="coming-soon" label="more coming soon..." disabled={true} />
            <Button text="apply" id="apply-button" event={(e: Event) => {e.preventDefault(); handleApply();}} />
        {/if}
        {#if state === DOWNLOAD}
            <div id="download-options">
                <Button text="download" id="download-button" event={handleDownload} />
                <Button text="reset" id="reset-button" event={handleReset} />
            </div>
        {/if}
    </form>
</div>

<style lang="scss">
    #wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    #src-img-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        aspect-ratio: 16 / 9;
        width: 75vw;
        max-width: 700px;
        height: auto;
        background-color: var(--secondary-color);
    }
    #img-canvas {
        display: none;
        box-sizing: border-box;
        border: 1px solid var(--primary-text-color);
        width: 75vw;
        max-width: 700px;
        height: auto;
    }
    #tool-form-container {
        width: 75vw;
        max-width: 700px;
        margin: 25px auto;
    }
    #download-options {
        display: flex;
        justify-content: space-between;
    }

    @media (prefers-color-scheme: light) {
        #src-img-container {
            background-color: var(--lightmode-secondary-color);
        }

        #img-canvas {
            border: 1px solid var(--lightmode-primary-text-color);
        }
    }
</style>
