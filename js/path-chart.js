'use strict';
/* 12 周学习路径图 — ALE 紫系，依赖 echarts + #path-chart */
(function () {
  const el = document.getElementById('path-chart');
  if (!el || typeof echarts === 'undefined') return;

  const purple700 = '#4f3478';
  const purple600 = '#6b489d';
  const purple500 = '#7e5cb4';
  const purple100 = '#f1ecf7';
  const ink = '#1a1a1a';
  const muted = '#616467';
  const line = '#d9d9d6';

  // [名称, 起始周, 结束周, 等级, 角色侧重]
  const rows = [
    { name: '3 天入门', start: 0, end: 1, level: 'L1', roles: '全员' },
    { name: '01 供应链', start: 1, end: 3, level: 'L1→L2', roles: 'PM / 售前' },
    { name: '02 架构版本', start: 3, end: 5, level: 'L2', roles: '测试 / PM' },
    { name: '03 测试运维', start: 5, end: 7, level: 'L2', roles: '测试 / 售前' },
    { name: '04 社区上游', start: 7, end: 9, level: 'L2', roles: 'PM' },
    { name: '05 定型协同', start: 9, end: 11, level: 'L2→L3', roles: 'PM' },
    { name: '06 商业化', start: 11, end: 13, level: 'L3', roles: 'PM / 售前' },
  ];

  const colors = [purple600, purple700, purple500, purple600, purple500, purple700, purple600];

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: '#fff',
      borderColor: line,
      borderWidth: 1,
      textStyle: { color: ink, fontSize: 13 },
      extraCssText: 'box-shadow:0 10px 30px rgb(50 36 76 / 14%);border-radius:8px;',
      formatter: function (p) {
        const r = rows[p.dataIndex];
        if (!r) return '';
        return (
          '<div style="font-weight:700;color:' + purple700 + '">' + r.name + '</div>' +
          '<div style="color:' + muted + ';margin-top:4px">第 ' + r.start + '–' + r.end + ' 周 · ' + r.level + '</div>' +
          '<div style="color:' + muted + '">侧重：' + r.roles + '</div>'
        );
      },
    },
    grid: { left: 108, right: 28, top: 36, bottom: 40 },
    xAxis: {
      type: 'value',
      min: 0,
      max: 13,
      interval: 1,
      name: '周',
      nameLocation: 'middle',
      nameGap: 28,
      nameTextStyle: { color: muted, fontSize: 12 },
      axisLine: { lineStyle: { color: line } },
      axisTick: { show: false },
      axisLabel: {
        color: muted,
        fontSize: 12,
        formatter: function (v) {
          if (v === 0) return '第0周';
          if (v % 2 === 1 || v === 13) return String(v);
          return '';
        },
      },
      splitLine: { lineStyle: { color: line, type: 'dashed', opacity: 0.7 } },
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: rows.map(function (r) { return r.name; }),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: ink, fontSize: 13, fontWeight: 600 },
    },
    series: [
      {
        type: 'custom',
        renderItem: function (params, api) {
          const cat = api.coord([0, params.dataIndex]);
          const start = api.coord([api.value(0), params.dataIndex]);
          const end = api.coord([api.value(1), params.dataIndex]);
          const band = api.size([0, 1])[1];
          const h = Math.min(22, band * 0.45);
          const y = cat[1] - h / 2;
          return {
            type: 'rect',
            shape: {
              x: start[0],
              y: y,
              width: Math.max(end[0] - start[0], 8),
              height: h,
              r: 6,
            },
            style: {
              fill: colors[params.dataIndex] || purple600,
              stroke: 'none',
            },
          };
        },
        encode: { x: [0, 1], y: 2 },
        data: rows.map(function (r, i) {
          return [r.start, r.end, i];
        }),
      },
      {
        // 右侧等级标注（透明点 + label）
        type: 'scatter',
        symbolSize: 0,
        data: rows.map(function (r, i) {
          return {
            value: [13.15, i],
            label: {
              show: true,
              position: 'right',
              formatter: r.level + ' · ' + r.roles,
              color: muted,
              fontSize: 11,
            },
          };
        }),
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

  // 暗色主题下微调文字色
  const ro = function () {
    const dark = document.documentElement.classList.contains('dark');
    chart.setOption({
      yAxis: { axisLabel: { color: dark ? '#efedf4' : ink } },
      tooltip: {
        backgroundColor: dark ? '#211d2c' : '#fff',
        textStyle: { color: dark ? '#efedf4' : ink },
        borderColor: dark ? '#3d3750' : line,
      },
    });
  };
  const themeBtn = document.querySelectorAll('[data-theme-toggle]');
  themeBtn.forEach(function (b) {
    b.addEventListener('click', function () { setTimeout(ro, 50); });
  });
  ro();
})();
