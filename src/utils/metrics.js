export function getStatusColor(status) {
  if (status === "good") return "#e6fffa";
  if (status === "warning") return "#fff7e6";
  return "#ffe6e6";
}

export function getMetricStatus(title, value) {
  if (title === "Page Load Time") {
    if (value < 2500) return "good";
    if (value < 3500) return "warning";
    return "bad";
  }

  if (title === "API Latency") {
    if (value < 800) return "good";
    if (value < 1200) return "warning";
    return "bad";
  }

  if (title === "Error Rate") {
    if (value < 1) return "good";
    if (value < 3) return "warning";
    return "bad";
  }

  return "good";
}

export function getExplanation(title, status) {
  if (status === "good") return "Everything looks healthy.";

  if (title === "Page Load Time") {
    return status === "warning"
      ? "Page is loading slower than usual. Some users may notice delays."
      : "Page load time is very high. Users may abandon the page.";
  }

  if (title === "API Latency") {
    return status === "warning"
      ? "API responses are slower. Data may take longer to appear."
      : "API latency is too high. Features depending on APIs may fail.";
  }

  if (title === "Error Rate") {
    return status === "warning"
      ? "Error rate is increasing. Some actions may not work properly."
      : "High error rate detected. Users may face broken functionality.";
  }

  return "";
}

export function hasRegression(history, key, currentValue) {
  if (history.length < 3) return false;

  const recent = history.slice(-3).map((h) => Number(h[key]));
  const average =
    recent.reduce((sum, val) => sum + val, 0) / recent.length;

  return currentValue > average * 1.2;
}
