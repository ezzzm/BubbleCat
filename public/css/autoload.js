/*!
 * Live2D Widget Autoload Script
 * 为BubbleCat网站定制
 * 版本: 1.0.0 - 最后修改于 2025-09-27
 */

// 这个文件只是一个简单的包装器，用于保持与原始autoload.js的兼容性
// 实际的配置和初始化在live2d-config.js中

console.log("Autoload脚本已加载，将使用live2d-config.js进行初始化");

// 加载主配置文件
function loadMainConfig() {
	const script = document.createElement("script");
	script.src = "/js/live2d-config.js";
	script.async = true;
	script.onload = () => {
		console.log("Live2D主配置脚本加载完成");
	};
	script.onerror = () => {
		console.error("加载Live2D主配置脚本失败");
	};
	document.head.appendChild(script);
}

// 页面加载完成后初始化
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", loadMainConfig);
} else {
	loadMainConfig();
}
