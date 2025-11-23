<script lang="ts">
    let { id, label, disabled = false } = $props();
</script>

<div class="radio-wrapper" id="{id}-wrapper">
    <input type="radio" id="{id}-input" name="action" {disabled} />
    <label for="{id}-input" class="input-label">{label}</label>
</div>

<style lang="scss">
    .radio-wrapper {
        display: flex;

        input[type='radio'] {
            -webkit-appearance: none;
            appearance: none;
            background-color: var(--primary-color);
            color: var(--primary-text-color);
            min-width: 1em;
            width: 1em;
            max-height: 1em;
            height: 1em;
            border: 0.15em solid currentColor;
            border-radius: 0;
            margin: 10px 0;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;

            &::before {
                content: '';
                width: 0.5em;
                height: 0.5em;
                border-radius: 0;
                transform: scale(0);
                transition: transform 0.15s ease-in-out;
                box-shadow: inset 1em 1em var(--primary-text-color);
            }

            &:disabled {
                cursor: not-allowed;
                opacity: 0.5;

                + label {
                    cursor: not-allowed;
                    opacity: 0.5;
                }
            }

            &:checked::before {
                transform: scale(1);
            }
        }

        label {
            font-size: 1em;
            margin: 10px 0;
            cursor: pointer;
            padding-left: 10px;
            color: var(--primary-text-color);
        }
    }
</style>
