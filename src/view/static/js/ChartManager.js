class HorzScaleBehaviorPrice {
  shortLabels = {
    DGS1MO: "1M",
    DGS3MO: "3M",
    DGS6MO: "6M",
    DGS1: "1Y",
    DGS2: "2Y",
    DGS3: "3Y",
    DGS5: "5Y",
    DGS7: "7Y",
    DGS10: "10Y",
    DGS20: "20Y",
    DGS30: "30Y",
  };

  options() {}

  setOptions() {}

  updateFormatter() {}

  createConverterToInternalObj() {
    return (price) => price;
  }

  key(internalItem) {
    return internalItem;
  }

  cacheKey(internalItem) {
    return internalItem;
  }

  convertHorzItemToInternal(item) {
    return item;
  }

  formatHorzItem(item) {
    return item;
  }

  formatTickmark(item) {
    return this.shortLabels[item.time];
  }

  maxTickMarkWeight(marks) {
    return marks[0].weight;
  }

  fillWeightsForPoints() {}
}

export default class ChartManager {
  chartOptions = {
    autoSize: true,
    layout: {
      background: { type: "solid", color: "transparent" },
      textColor: "#1a1a1a",
      fontSize: 12,
    },
    rightPriceScale: {
      visible: false,
    },
    leftPriceScale: {
      scaleMargins: { top: 0.15, bottom: 0.05 },
      borderVisible: false,
      visible: true,
    },
    crosshair: {
      horzLine: {
        visible: false,
        labelVisible: false,
      },
      vertLine: {
        visible: false,
        labelVisible: false,
      },
    },
    grid: {
      vertLines: { color: "#e5e5e5" },
      horzLines: { color: "#e5e5e5" },
    },
    handleScroll: {
      mouseWheel: false,
      pressedMouseMove: false,
      horzTouchDrag: false,
      vertTouchDrag: false,
    },
    handleScale: {
      mouseWheel: false,
      pinch: false,
      axisPressedMouseMove: false,
      axisDoubleClickReset: false,
    },
    timeScale: {
      borderVisible: false,
      allowBoldLabels: false,
    },
  };
  lineOptions = {
    lineColor: "#4f83cc",
    lineWidth: 3,
    lineVisible: true,
    lastValueVisible: false,
    priceLineVisible: false,
    crosshairMarkerVisible: true,
    crosshairMarkerRadius: 5,
    crosshairMarkerBorderColor: "#fafafa",
  };
  toolTipWidth = 84;

  constructor(data) {
    this.data = data;
  }

  createCharts() {
    for (let date in this.data) {
      let chartContainer = document.createElement("div");
      chartContainer.classList.add("chart");
      chartContainer.style.position = "relative";
      document.getElementById("container").appendChild(chartContainer);

      this.createCanvas(chartContainer, this.data[date]);
      this.createTitle(chartContainer, date);
    }
  }

  createCanvas(chartContainer, points) {
    let chart = LightweightCharts.createChartEx(
      chartContainer,
      new HorzScaleBehaviorPrice(),
      this.chartOptions
    );
    let lineSeries = chart.addLineSeries(this.lineOptions);
    lineSeries.setData(points);
    chart
      .timeScale()
      .setVisibleLogicalRange({ from: 0, to: points.length - 1 });
    chart.timeScale().fitContent();
    this.createTooltip(chartContainer, chart, lineSeries);
  }

  createTooltip(chartContainer, chart, series) {
    const toolTip = document.createElement("div");
    toolTip.style = `
      position: absolute;
      left: 12px;
      height: 100%;
      
      display: none;
      pointer-events: none;
    
      padding: 8px;
      
      font-size: 12px;
      text-align: left;
    
      z-index: 1000;
      
      background: rgba(255, 255, 255, 0.25);
      border-radius: 8px;
      border-color: rgba(239, 83, 80, 1);
      box-shadow: 0 2px 5px 0 rgba(117, 134, 150, 0.45);
    `;
    chartContainer.appendChild(toolTip);
    chart.subscribeCrosshairMove((param) => {
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > chartContainer.clientWidth ||
        param.point.y < 0 ||
        param.point.y > chartContainer.clientHeight
      ) {
        toolTip.style.display = "none";
      } else {
        const dateStr = param.time;
        toolTip.style.display = "flex";
        toolTip.style.flexDirection = "column";
        toolTip.style.justifyContent = "center";
        const data = param.seriesData.get(series);
        const price = data.value !== undefined ? data.value : data.close;
        toolTip.innerHTML = `
            <div style="font-size: 12px; font-weight: 700; color: #4f83cc;">⬤ UST Yield</div>
            <div style="font-size: 24px; margin: 4px 0; color: #1a1a1a;">${price}</div>
            <div style="font-size: 14px; color: #1a1a1a;">${dateStr}</div>
        `;
        let left = param.point.x;
        const timeScaleWidth = chart.timeScale().width();
        const priceScaleWidth = chart.priceScale("left").width();
        const halfTooltipWidth = this.toolTipWidth / 2;
        left += priceScaleWidth - halfTooltipWidth;
        left = Math.min(
          left,
          priceScaleWidth + timeScaleWidth - this.toolTipWidth
        );
        left = Math.max(left, priceScaleWidth);
        toolTip.style.left = left + "px";
        toolTip.style.top = 0 + "px";
      }
    });
  }

  createTitle(chartContainer, title) {
    const titleDiv = document.createElement("div");
    titleDiv.textContent = title;
    titleDiv.style = `
        position: absolute;
        top: 0%;  
        left: 50%;  
        transform: translateX(-50%);
        
        padding: 8px;  
      
        font-size: 20px;  
        font-weight: bold;  
        text-align: center;  
        color: #1a1a1a;  
      
        z-index: 10;  
        border-radius: 4px;
    `;
    chartContainer.appendChild(titleDiv);
  }
}
