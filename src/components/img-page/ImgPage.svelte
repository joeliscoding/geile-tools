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
        let selectedOption = document
            .querySelector('input[name="action"]:checked')
            ?.id.split('-')[0];
        if (!selectedOption) selectedOption = fileExt;
        let downloadType = fileType;
        switch (selectedOption) {
            case 'png':
                downloadType = 'image/png';
                break;
            case 'jpg':
                downloadType = 'image/jpeg';
                break;
            case 'webp':
                downloadType = 'image/webp';
                break;
        }
        if (fileExt === 'jpeg') {
            selectedOption = 'jpg';
        }
        const link = document.createElement('a');
        console.log(selectedOption, downloadType);
        link.download = `edited-image.${selectedOption}`;
        link.href = canvas.toDataURL(downloadType);
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
    <canvas id="img-canvas"></canvas>
    {#if state === UPLOAD}
        <div id="src-img-container">
            <form method="dialog" enctype="multipart/form-data">
                <Button text="select image" id="select-image-button" event={handleImageSelect} />
            </form>
        </div>
    {/if}

    <div id="forms-container">
        <form id="tools-form">
            <div class="form-element">
                <h2>Options</h2>
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
                    <Button
                        text="apply"
                        id="apply-button"
                        event={(e: Event) => {
                            e.preventDefault();
                            handleApply();
                        }}
                    />
                    <br>
                    <Button text="reset" id="reset-button" event={handleReset} />
                {/if}

            </div>
        </form>

        {#if state !== UPLOAD}
            <form id="convert-form">
                <div class="form-element">
                    <h2>File Type</h2>
                    <RadioElement id="png" label="png" />
                    <RadioElement id="jpg" label="jpg" />
                    <RadioElement id="webp" label="webp" />
                    <Button text="download" id="download-button" event={handleDownload} />
                </div>
            </form>
        {/if}
    </div>
</div>

<style lang="scss">
    .form-element {
        margin-bottom: 2.5rem;
    }
    h2 {
        color: var(--primary-text-color);
        font-size: 1.25rem;
        margin-bottom: 1rem;
        text-decoration: underline;
    }
    #wrapper {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 5%;
    }
    #src-img-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        aspect-ratio: 16 / 9;
        width: 45vw;
        max-width: 700px;
        height: auto;
        background-color: var(--secondary-color);
    }
    #img-canvas {
        display: none;
        box-sizing: border-box;
        border: 1px solid var(--primary-text-color);
        width: 45vw;
        max-width: 700px;
        height: auto;
    }

    @media (max-width: 600px) {
        #wrapper {
            grid-template-columns: 1fr;
        }
        #src-img-container,
        #img-canvas {
            width: 90vw;
        }
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
