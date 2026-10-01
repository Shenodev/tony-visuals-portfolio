import http from "k6/http";
import { check, sleep } from "k6";
import { Rate, Trend } from "k6/metrics";

const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";

const errorRate = new Rate("errors");
const latencyTrend = new Trend("latency");

export const options = {
  scenarios: {
    landing_page: {
      executor: "ramping-arrival-rate",
      startRate: 10,
      timeUnit: "1s",
      preAllocatedVUs: 50,
      maxVUs: 200,
      stages: [
        { duration: "30s", target: 50 },
        { duration: "1m", target: 100 },
        { duration: "30s", target: 200 },
        { duration: "30s", target: 100 },
        { duration: "30s", target: 0 },
      ],
      exec: "landingPage",
    },
    api_albums: {
      executor: "ramping-arrival-rate",
      startRate: 20,
      timeUnit: "1s",
      preAllocatedVUs: 100,
      maxVUs: 500,
      stages: [
        { duration: "30s", target: 100 },
        { duration: "1m", target: 200 },
        { duration: "30s", target: 400 },
        { duration: "30s", target: 200 },
        { duration: "30s", target: 0 },
      ],
      exec: "apiAlbums",
    },
  },
  thresholds: {
    http_req_duration: ["avg<200", "p(99)<500"],
    errors: ["rate<0.05"],
  },
};

export function landingPage() {
  const res = http.get(`${BASE_URL}/`);
  latencyTrend.add(res.timings.duration);
  const success = check(res, {
    "landing: status 200": (r) => r.status === 200,
    "landing: has content": (r) => r.body && r.body.length > 1000,
  });
  errorRate.add(!success);
  sleep(Math.random() * 2 + 1);
}

export function apiAlbums() {
  const res = http.get(`${BASE_URL}/api/albums`);
  latencyTrend.add(res.timings.duration);
  const success = check(res, {
    "api: status 200": (r) => r.status === 200,
    "api: valid json": (r) => {
      try {
        JSON.parse(r.body);
        return true;
      } catch {
        return false;
      }
    },
  });
  errorRate.add(!success);
  sleep(Math.random() * 3 + 1);
}
