import ChartManager from "./ChartManager.js";
import { getData } from "./fetchClient.js";

const data = await getData();
const chartManager = new ChartManager(data);
chartManager.createCharts();
