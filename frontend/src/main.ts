import { createApp } from 'vue'
import { router } from './router/index.ts'
import App from './App.vue'
import './style.css'
import i18n from './i18n.ts'
import resolveTitle from '@/utils/titleResolver'

const app = createApp(App)

app.use(router)
app.use(i18n)

// Centralized title resolver sets the document.title after navigation.
router.afterEach((to) => {
	try {
		const title = resolveTitle(to as any, i18n.global as any)
		document.title = title
	} catch (err) {
		console.warn('Failed to set document.title:', err)
	}
})

app.mount('#app')
