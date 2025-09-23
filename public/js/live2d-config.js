/*!
 * Live2D Widget配置文件
 * 为BubbleCat网站定制
 */

// 配置模型加载路径
const live2d_path = "/live2d-models/";
// 资源路径可以是绝对路径或相对路径

// 封装异步加载资源的方法
function loadExternalResource(url, type) {
	return new Promise((resolve, reject) => {
		let tag;

		if (type === "css") {
			tag = document.createElement("link");
			tag.rel = "stylesheet";
			tag.href = url;
		} else if (type === "js") {
			tag = document.createElement("script");
			tag.src = url;
			tag.async = true;
		}
		if (tag) {
			tag.onload = () => resolve(url);
			tag.onerror = () => reject(url);
			document.head.appendChild(tag);
		}
	});
}

// 初始化Live2D
function initLive2D() {
	// 避免图片资源跨域问题
	const OriginalImage = window.Image;
	window.Image = (...args) => {
		const img = new OriginalImage(...args);
		img.crossOrigin = "anonymous";
		return img;
	};
	window.Image.prototype = OriginalImage.prototype;

	// 加载必要的JavaScript和CSS文件
	Promise.all([
		loadExternalResource(
			"https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/waifu.css",
			"css",
		),
		loadExternalResource(
			"https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/waifu-tips.js",
			"js",
		),
		loadExternalResource(
			"https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/live2d.min.js",
			"js",
		),
	]).then(() => {
		// 配置选项
		initWidget({
			waifuPath:
				"https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/waifu-tips.json",
			apiPath: live2d_path,
			// cdnPath: 'https://fastly.jsdelivr.net/gh/fghrsh/live2d_api/', // 使用 CDN 时配置此项
			tools: ["hitokoto", "switch-model", "photo", "info", "quit"],
		});
	});
}

// 导出初始化函数，以便在需要时调用
window.initLive2D = initLive2D;

// 自动初始化
document.addEventListener("DOMContentLoaded", initLive2D);

// 检测并处理页面切换事件，以便在Astro View Transitions后重新初始化
if (window.swup) {
	initLive2D();
	window.swup.hooks.on("page:view", initLive2D);
} else {
	document.addEventListener("swup:enable", () => {
		initLive2D();
		window.swup.hooks.on("page:view", initLive2D);
	});
}
