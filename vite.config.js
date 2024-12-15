import { defineConfig, loadEnv } from 'vite'
import PurgeCSS from '@fullhuman/postcss-purgecss'
import { ViteFaviconsPlugin } from 'vite-plugin-favicon'
import autoprefixer from 'autoprefixer'
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminOptipng from 'imagemin-optipng'
import imageminSvgo from 'imagemin-svgo'
import imageminWebp from 'imagemin-webp'
import legacy from '@vitejs/plugin-legacy'
import postcssPresetEnv from 'postcss-preset-env'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import svgr from 'vite-plugin-svgr'
import viteImagemin from 'vite-plugin-imagemin'
import webfontDL from 'vite-plugin-webfont-dl'
import sortMediaQueries from 'postcss-sort-media-queries'

export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd())
	return {
		base: './',
		publicDir: resolve(__dirname, 'public'),
		server: {
			port: 3000,
			strictPort: true,
		},
		preview: {
			port: 3003,
			strictPort: true,
		},
		plugins: [
			react(),
			svgr({
				// Для підключення svg як ReactComponent
				svgrOptions: { exportType: 'named', ref: true, svgo: false, titleProp: true },
				include: '/**/*.svg',
			}),
			// webfontDL(['https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'], {
			// 	injectAsStyleTag: true, // вставляти завантажені стилі шрифтів як тег <style> безпосередньо у html документ.
			// 	minifyCss: true, // мініфікувати CSS перед вставкою
			// 	async: true, // Асинхронне завантаження шрифтів
			// 	cache: true, // кешувати завантажені шрифти для подальшого використання
			// 	proxy: false, // використовувати проксі для завантаження шрифтів
			// }),
			legacy({
				targets: ['defaults'],
			}), // для генерації легасі версій JavaScript та CSS для застарілих браузерів, які не підтримують сучасний синтаксис або функціональність.
			viteImagemin({
				// root: './',
				exclude: [/favicons\/.*\.png$/],
				skipIfLarger: true,
				clearCache: true,
				plugins: {
					jpg: imageminMozjpeg({
						arithmetic: true,
					}),
					png: imageminOptipng({
						optimizationLevel: 5,
					}),
					svg: imageminSvgo({
						plugins: [
							{ name: 'removeViewBox', active: false },
							{ name: 'removeMetadata', active: true },
							{ name: 'removeComments', active: true },
							{ name: 'removeTitle', active: true },
							{ name: 'removeDoctype', active: true },
							{ name: 'removeXMLProcInst', active: true },
							{ name: 'removeUnusedNS', active: true },
							{ name: 'removeEditorsNSData', active: true },
							{ name: 'removeEmptyAttrs', active: true },
							{ name: 'removeEmptyText', active: true },
							{ name: 'removeEmptyContainers', active: true },
							{ name: 'convertColors', params: { shorthex: true } },
							{ name: 'convertStyleToAttrs', active: true },
							{ name: 'convertPathData', active: true },
							{ name: 'convertTransform', active: true },
							{ name: 'removeUnknownsAndDefaults', active: true },
							{ name: 'removeNonInheritableGroupAttrs', active: true },
							{ name: 'collapseGroups', active: true },
							{ name: 'mergePaths', active: true },
							{ name: 'removeDesc', params: { removeAny: false } },
							{ name: 'removeDimensions', active: true },
						],
					}),
				},
				makeWebp: {
					plugins: {
						jpg: imageminWebp({
							preset: 'picture',
							sns: 70,
						}),
						png: imageminWebp({
							preset: 'picture',
							sns: 70,
						}),
					},
					formatFilePath: path => path.replace(/\.[^/.]+$/, '') + '.webp',
				},
			}),
			env.VITE_FAVICONS === 'favicons' &&
				ViteFaviconsPlugin({
					logo: './src/assets/react.svg', // шлях до вихідного зображення, яке буде використане для генерації favicon.
					// outputPath: "./favicons/",
					favicons: {
						appName: 'Material Landing', // Назва веб-сайту або додатку
						icons: {
							android: true, // Генерує іконку для Android-пристроїв.
							appleIcon: true, // Генерує іконку для пристроїв Apple.
							appleStartup: true, // Генерує іконку для стартового екрана на пристроях Apple.
							favicons: true, // Генерує стандартні favicon для браузерів.
							windows: true, // Генерує іконку для пристроїв Windows.
							yandex: false, // Відключає генерацію іконок для сервісу Yandex.
						},
					},
				}),
		],
		css: {
			postcss: {
				plugins: [
					autoprefixer(), // автоматично додає вендорні префікси до CSS правил, щоб забезпечити сумісність з різними браузерами.
					postcssPresetEnv(), // використовувати сучасні функції CSS, які ще не включені в стандарті, але вже підтримуються деякими браузерами.
					PurgeCSS({
						// видалення невикористаних CSS-стилів
						content: ['./*.html', './src/**/*.jsx', './src/**/*.js'], // шляхи до файлів, які ви хочете аналізувати на наявність використаного CSS
						fontFace: true, // видаляти невикористовувані @font-face.
						keyframes: true, // видаляти невикористовувані анімації keyframes.
						variables: true, //  видаляти невикористовувані CSS-змінні.
						rejected: true, // Логує видалені CSS-класи для налагодження.
						rejectedCss: true, // Створює файл з невикористаними CSS-класами для аналізу.
					}),
					sortMediaQueries({ sort: 'desktop-first' }),
				],
			},
		},
		build: {
			outDir: resolve(__dirname, 'docs'),
			chunkSizeWarningLimit: 2000, // 2000 байт
			cssCodeSplit: true, // чи слід розділяти CSS код на окремі файли
			// target: "esnext", // використання ES модулів, які дозволяють браузерам завантажувати та кешувати модулі окремо.
			terserOptions: {
				compress: {
					drop_console: true, // Видаляє всі виклики функції console.*.
					dead_code: true, // Видаляє "мертвий" код, тобто код, який не використовується та ніколи не буде використаний.
					unused: true, //  Видаляє непотрібні змінні та функції, які не використовуються в коді.
					arrows: true, // Перетворює вирази-стрілки в більш стислий синтаксис, якщо це можливо.
					conditionals: true, // Зменшує розмір умовних виразів, спрощуючи їх, якщо це можливо.
					booleans: true, // Мінімізує використання логічних значень, замінюючи їх на їх скорочені аналоги, якщо це можливо.
					if_return: true, // Перетворює певні if-блоки на вирази return
					join_vars: true, // Об'єднує послідовно призначені змінні в один вираз
					reduce_funcs: true, // Спрощує виклики функцій, замінюючи їх на більш ефективні конструкції, якщо це можливо.
					reduce_vars: true, // Спрощує обробку змінних, замінюючи їх на більш ефективні конструкції, якщо це можливо.
				},
				mangle: {
					toplevel: true, // Зменшує імена змінних та функцій на рівні глобального обсягу видимості,
				},
				parse: {
					html5_comments: false, // HTML-подібні коментарі будуть видалені під час стиснення коду.
					shebang: false, //  рядок "shebang" (починається з #!) буде вилучений з вихідного коду під час його стиснення
				},
				format: {
					comments: false, // Видаляє всі коментарі
				},
				safari10: true, // Вирішує специфічні проблеми сумісності, пов'язані з Safari 10.
			},
			rollupOptions: {
				output: {
					entryFileNames: '[name].[hash].js',
					chunkFileNames: '[name].[hash].js',
					assetFileNames: assetInfo => {
						const extType = assetInfo.name?.split('.').pop()
						const assetName = assetInfo.name ? assetInfo.name.toString() : ''

						if (
							['android-chrome', 'apple-touch', 'coast', 'favicon', 'firefox', 'mstile'].some(keyword =>
								assetName.includes(keyword)
							)
						) {
							return `favicons/[name].[ext]`
						} else if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(extType ? extType : '')) {
							return `img/[name].[ext]`
						} else if (['woff', 'woff2', 'eot', 'ttf', 'otf'].includes(extType ? extType : '')) {
							return `fonts/[name].[ext]`
						}

						return `[name].[ext]`
					},
					manualChunks: {
						vendor: ['react', 'react-dom'],
					},
				},
			},
			treeshake: true,
		},
		resolve: {
			alias: {
				'@': resolve(__dirname, './src'),
			},
		},
	}
})
