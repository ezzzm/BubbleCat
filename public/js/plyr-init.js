/*!
 * Plyr初始化脚本，用于处理页面切换后的视频播放器初始化
 * 适配Astro View Transitions
 */

// 初始化Plyr播放器的函数
function initPlyrPlayers() {
	// 查找页面中所有video标签
	const videoElements = document.querySelectorAll("video");

	// 如果找到了视频元素，初始化Plyr
	if (videoElements.length > 0) {
		// 如果页面上已经有Plyr实例，先尝试销毁它们
		const oldPlayers = document.querySelectorAll(".plyr");
		oldPlayers.forEach((player) => {
			if (player && player.plyr) {
				player.plyr.destroy();
			}
		});

		// 初始化新的Plyr播放器
		const players = Array.from(videoElements).map((video) => {
			return new Plyr(video, {
				controls: [
					"play-large",
					"play",
					"progress",
					"current-time",
					"mute",
					"volume",
					"captions",
					"settings",
					"pip",
					"airplay",
					"fullscreen",
				],
				i18n: {
					restart: "重新播放",
					rewind: "后退 {seektime} 秒",
					play: "播放",
					pause: "暂停",
					fastForward: "前进 {seektime} 秒",
					seek: "跳转",
					seekLabel: "{currentTime} / {duration}",
					played: "已播放",
					buffered: "已缓冲",
					currentTime: "当前时间",
					duration: "总时长",
					volume: "音量",
					mute: "静音",
					unmute: "取消静音",
					enableCaptions: "启用字幕",
					disableCaptions: "禁用字幕",
					download: "下载",
					enterFullscreen: "全屏",
					exitFullscreen: "退出全屏",
					frameTitle: "{title} 播放器",
					captions: "字幕",
					settings: "设置",
					menuBack: "返回上一级菜单",
					speed: "播放速度",
					normal: "正常",
					quality: "视频质量",
					loop: "循环播放",
					start: "开始",
					end: "结束",
					all: "全部",
					reset: "重置",
					disabled: "禁用",
					enabled: "启用",
					advertisement: "广告",
					qualityBadge: {
						2160: "4K",
						1440: "HD",
						1080: "HD",
						720: "HD",
						576: "SD",
						480: "SD",
					},
				},
			});
		});

		// 设置播放列表按钮事件处理
		const playlistButtons = document.querySelectorAll(".playlist-btn");
		playlistButtons.forEach((button) => {
			button.addEventListener("click", () => {
				const newVideoSrc = button.getAttribute("data-video-src");
				if (newVideoSrc && players.length > 0) {
					players[0].source = {
						type: "video",
						sources: [{ src: newVideoSrc, type: "video/mp4" }],
					};
					players[0].play();
				}
			});
		});

		return players;
	}
	return [];
}

// 页面加载时初始化播放器
document.addEventListener("DOMContentLoaded", initPlyrPlayers);

// 检测并处理页面切换事件，以便在Astro View Transitions后重新初始化
if (window.swup) {
	initPlyrPlayers();
	window.swup.hooks.on("page:view", initPlyrPlayers);
} else {
	document.addEventListener("swup:enable", () => {
		initPlyrPlayers();
		window.swup.hooks.on("page:view", initPlyrPlayers);
	});
}
