import { lazy, Suspense } from "react"

// Lazy load Recharts components to reduce initial bundle
const LazyBarChart = lazy(() =>
  import("recharts").then(module => ({
    default: module.BarChart
  }))
)

const LazyLineChart = lazy(() =>
  import("recharts").then(module => ({
    default: module.LineChart
  }))
)

const LazyAreaChart = lazy(() =>
  import("recharts").then(module => ({
    default: module.AreaChart
  }))
)

const LazyCombinedChart = lazy(() =>
  import("recharts").then(module => ({
    default: module.ComposedChart
  }))
)

// Chart loading skeleton
function ChartSkeleton() {
  return (
    <div
      style={{
        width: "100%",
        height: "300px",
        background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
        backgroundSize: "200% 100%",
        animation: "loading 1.5s infinite"
      }}
    />
  )
}

export const BarChart = (props) => (
  <Suspense fallback={<ChartSkeleton />}>
    <LazyBarChart {...props} />
  </Suspense>
)

export const LineChart = (props) => (
  <Suspense fallback={<ChartSkeleton />}>
    <LazyLineChart {...props} />
  </Suspense>
)

export const AreaChart = (props) => (
  <Suspense fallback={<ChartSkeleton />}>
    <LazyAreaChart {...props} />
  </Suspense>
)

export const ComposedChart = (props) => (
  <Suspense fallback={<ChartSkeleton />}>
    <LazyCombinedChart {...props} />
  </Suspense>
)
