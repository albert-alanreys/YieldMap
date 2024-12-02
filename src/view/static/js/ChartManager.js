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
      scaleMargins: { top: 0.05, bottom: 0.05 },
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
    color: "#4f83cc",
    lineWidth: 2,
    lineVisible: true,
    lastValueVisible: false,
    priceLineVisible: false,
    crosshairMarkerVisible: true,
    crosshairMarkerRadius: 5,
    crosshairMarkerBorderColor: "#fafafa",
  };
  toolTipWidth = 84;
  chartsCount = 30;

  constructor(data) {
    function* chartIterator(data, batchSize) {
      const keys = Object.keys(data);

      for (let i = 0; i < keys.length; i += batchSize) {
        yield keys.slice(i, i + batchSize);
      }
    }

    this.iterator = chartIterator(data, 30);
    this.data = data;
  }

  createCharts() {
    this.nextBatch = this.iterator.next();
    this.addChartsToPage(this.nextBatch.value);

    window.addEventListener("scroll", this.onScroll.bind(this));
  }

  onScroll() {
    const scrollPosition = window.scrollY + window.innerHeight;
    const totalHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= totalHeight - 150) {
      this.nextBatch = this.iterator.next();

      if (this.nextBatch.done) {
        return;
      }

      this.addChartsToPage(this.nextBatch.value);
    }
  }

  addChartsToPage(ids) {
    for (const id of ids) {
      const chartContainer = document.createElement("div");
      chartContainer.classList.add("chart");
      chartContainer.style.position = "relative";

      document.getElementById("container").appendChild(chartContainer);

      this.addChart(chartContainer, this.data[id]);
      this.createTitle(chartContainer, id);
    }
  }

  addChart(container, points) {
    const chart = LightweightCharts.createChartEx(
      container,
      new HorzScaleBehaviorPrice(),
      this.chartOptions
    );
    const timeScale = chart.timeScale();
    const lineSeries = chart.addLineSeries(this.lineOptions);

    timeScale.setVisibleLogicalRange({ from: 0, to: points.length - 1 });
    lineSeries.setData(points);

    this.createTooltip(chart, lineSeries);
  }

  createTooltip(chart, series) {
    const container = chart.chartElement();
    const toolTip = document.createElement("div");

    toolTip.style = `
      display: none;
      position: absolute;
      left: 12px;
      z-index: 1000;
      
      width: ${this.toolTipWidth};
      height: 100%;
      padding: 8px;

      pointer-events: none;
      
      font-size: 12px;
      text-align: left;

      border-radius: 8px;
      border-color: rgba(239, 83, 80, 1);
      background-color: rgba(255, 255, 255, 0.25);
      box-shadow: 0 2px 5px 0 rgba(117, 134, 150, 0.45);
    `;
    container.appendChild(toolTip);

    chart.subscribeCrosshairMove((param) => {
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > container.clientWidth ||
        param.point.y < 0 ||
        param.point.y > container.clientHeight
      ) {
        toolTip.style.display = "none";
      } else {
        const label = param.time;
        const data = param.seriesData.get(series);

        toolTip.style.display = "flex";
        toolTip.style.flexDirection = "column";
        toolTip.style.justifyContent = "center";
        toolTip.style.top = "0px";
        toolTip.innerHTML = `
            <div style="font-size: 12px; font-weight: 700; color: #4f83cc;">⬤ UST Yield</div>
            <div style="font-size: 24px; margin: 4px 0; color: #1a1a1a;">${data.value}</div>
            <div style="font-size: 14px; color: #1a1a1a;">${label}</div>
        `;

        const timeScaleWidth = chart.timeScale().width();
        const priceScaleWidth = chart.priceScale("left").width();
        const halfTooltipWidth = this.toolTipWidth / 2;
        const left = Math.max(
          Math.min(
            param.point.x + priceScaleWidth - halfTooltipWidth,
            priceScaleWidth + timeScaleWidth - this.toolTipWidth
          ),
          priceScaleWidth
        );
        toolTip.style.left = left + "px";
      }
    });
  }

  createTitle(container, title) {
    const titleDiv = document.createElement("div");

    titleDiv.textContent = title;
    titleDiv.style = `
        position: absolute;
        top: 0%;  
        left: 50%;  
        z-index: 10;  
        transform: translateX(-50%);
        
        padding: 6px;  
        border-radius: 4px;
      
        font-size: 20px;  
        font-weight: 600;  
        text-align: center;  
        color: #1a1a1a;  
    `;

    container.appendChild(titleDiv);
  }
}
