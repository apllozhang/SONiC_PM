'use strict';
/* 角色覆盖对比图 — PM / 售前 / 测试 × 六条能力线 */
(function () {
  const el = document.getElementById('role-chart');
  if (!el || typeof echarts === 'undefined') return;

  const tracks = ['供应链', '架构版本', '测试运维', '社区上游', '定型协同', '商业化'];
  const roles = ['产品经理', '售前', '测试'];
  // 3=主修  2=重点  1=了解  0=可跳过
  const grid = [
    [3, 2, 2, 2, 3, 3], // PM
    [3, 1, 3, 1, 1, 3], // 售前
    [1, 3, 3, 1, 2, 1], // 测试
  ];
  const levelName = { 0: '可跳过', 1: '了解', 2: '重点', 3: '主修' };

  const data = [];
  grid.forEach(function (row, y) {
    row.forEach(function (v, x) {
      data.push([x, y, v]);
    });
  });

  const purple700 = '#4f3478';
  const purple600 = '#6b489d';
  const purple500 = '#7e5cb4';
  const purple100 = '#f1ecf7';
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
      formatter: function (p) {
        const v = p.data[2];
        return (
          '<div style="font-weight:700;color:' + purple700 + '">' + roles[p.data[1]] + ' · ' + tracks[p.data[0]] + '</div>' +
          '<div style="color:' + muted + ';margin-top:4px">建议：' + levelName[v] + '</div>'
        );
      },
    },
    grid: { left: 88, right: 16, top: 16, bottom: 56 },
    xAxis: {
      type: 'category',
      data: tracks,
      splitArea: { show: false },
      axisLine: { lineStyle: { color: line } },
      axisTick: { show: false },
      axisLabel: { color: ink, fontSize: 12, interval: 0 },
    },
    yAxis: {
      type: 'category',
      data: roles,
      inverse: true,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: ink, fontSize: 13, fontWeight: 600 },
    },
    visualMap: {
      min: 0,
      max: 3,
      calculable: false,
      orient: 'horizontal',
      left: 'center',
      bottom: 4,
      itemWidth: 12,
      itemHeight: 10,
      text: ['主修', '可跳过'],
      textStyle: { color: muted, fontSize: 11 },
      inRange: {
        color: ['#efeeec', purple100, purple500, purple700],
      },
    },
    series: [
      {
        type: 'heatmap',
        data: data,
        label: {
          show: true,
          color: function (p) {
            return p.data[2] >= 2 ? '#fff' : ink;
          },
          fontSize: 11,
          formatter: function (p) {
            return levelName[p.data[2]];
          },
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 2,
          borderRadius: 6,
        },
        emphasis: {
          itemStyle: {
            borderColor: purple600,
            borderWidth: 2,
            shadowBlur: 8,
            shadowColor: 'rgb(107 72 157 / 25%)',
          },
        },
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
    chart.setOption({
      xAxis: { axisLabel: { color: cInk } },
      yAxis: { axisLabel: { color: cInk } },
      visualMap: { textStyle: { color: cMuted } },
      series: [{
        label: {
          color: function (p) {
            return p.data[2] >= 2 ? '#fff' : cInk;
          },
        },
      }],
      tooltip: {
        backgroundColor: dark ? '#211d2c' : '#fff',
        textStyle: { color: cInk },
        borderColor: dark ? '#3d3750' : line,
      },
    });
  }
  document.querySelectorAll('[data-theme-toggle]').forEach(function (b) {
    b.addEventListener('click', function () { setTimeout(syncTheme, 50); });
  });
  syncTheme();
})();
