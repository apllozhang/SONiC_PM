'use strict';
/* L1–L3 能力梯度雷达 — 五维能力 vs 三级目标 */
(function () {
  const el = document.getElementById('level-radar');
  if (!el || typeof echarts === 'undefined') return;

  const dims = ['责任分层', '功能验收', '架构理解', '测试证据', '定型商业化'];
  // 0–5 示意刻度，用于比较三级目标，非精密评分
  const series = [
    { name: 'L1 会问对问题', value: [4, 3, 1, 1, 1] },
    { name: 'L2 撑起单模块', value: [4, 4, 4, 4, 2] },
    { name: 'L3 定型与商业化', value: [5, 5, 4, 4, 5] },
  ];

  const purple700 = '#4f3478';
  const purple600 = '#6b489d';
  const purple40 = '#e4d9f3';
  const ink = '#1a1a1a';
  const muted = '#616467';
  const line = '#d9d9d6';

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: '#fff',
      borderColor: line,
      textStyle: { color: ink, fontSize: 13 },
      extraCssText: 'box-shadow:0 10px 30px rgb(50 36 76 / 14%);border-radius:8px;',
    },
    legend: {
      bottom: 0,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { color: muted, fontSize: 12 },
    },
    radar: {
      indicator: dims.map(function (d) {
        return { name: d, max: 5 };
      }),
      radius: '62%',
      center: ['50%', '46%'],
      axisName: { color: ink, fontSize: 12 },
      splitLine: { lineStyle: { color: line } },
      splitArea: {
        areaStyle: {
          color: ['transparent', 'rgb(107 72 157 / 4%)'],
        },
      },
      axisLine: { lineStyle: { color: line } },
    },
    series: [
      {
        type: 'radar',
        symbolSize: 5,
        data: [
          {
            value: series[0].value,
            name: series[0].name,
            lineStyle: { color: purple40, width: 2 },
            areaStyle: { color: 'rgb(228 217 243 / 45%)' },
            itemStyle: { color: purple40 },
          },
          {
            value: series[1].value,
            name: series[1].name,
            lineStyle: { color: purple600, width: 2 },
            areaStyle: { color: 'rgb(107 72 157 / 18%)' },
            itemStyle: { color: purple600 },
          },
          {
            value: series[2].value,
            name: series[2].name,
            lineStyle: { color: purple700, width: 2.5 },
            areaStyle: { color: 'rgb(79 52 120 / 22%)' },
            itemStyle: { color: purple700 },
          },
        ],
      },
    ],
  };

  const chart = echarts.init(el, null, { renderer: 'canvas' });
  chart.setOption(option);

  function resize() {
    chart.resize();
  }
  window.addEventListener('resize', resize);
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(resize).observe(el);
  }

  function syncTheme() {
    const dark = document.documentElement.classList.contains('dark');
    const cInk = dark ? '#efedf4' : ink;
    const cMuted = dark ? '#9b96ab' : muted;
    const cLine = dark ? '#3d3750' : line;
    chart.setOption({
      radar: {
        axisName: { color: cInk },
        splitLine: { lineStyle: { color: cLine } },
        axisLine: { lineStyle: { color: cLine } },
      },
      legend: { textStyle: { color: cMuted } },
      tooltip: {
        backgroundColor: dark ? '#211d2c' : '#fff',
        textStyle: { color: cInk },
        borderColor: cLine,
      },
    });
  }
  document.querySelectorAll('[data-theme-toggle]').forEach(function (b) {
    b.addEventListener('click', function () { setTimeout(syncTheme, 50); });
  });
  syncTheme();
})();
