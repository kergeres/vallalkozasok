import Aura from '@primeuix/themes/aura'
import { definePreset } from '@primeuix/themes'

export const themeConfig = definePreset(Aura, {
    semantic: {
        InputText: {
            borderColor: '#535bf2',
            hoverBorderColor: '#535bf2',
            focusBorderColor: '#ff0000',
        },
    },
})
