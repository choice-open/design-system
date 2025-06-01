import type { Meta, StoryObj } from "@storybook/react"
import { enUS, ja, zhCN } from "date-fns/locale"
import React, { useState } from "react"
import { Panel } from "../../panel"
import { timeStringToDate } from "../utils/time"
import { TimeRangeInput } from "./time-range-input"

const meta: Meta<typeof TimeRangeInput> = {
  title: "DateAndTime/TimeRangeInput",
  component: TimeRangeInput,
  parameters: {
    layout: "centered",
  },
  tags: ["new"],
}

export default meta
type Story = StoryObj<typeof meta>

// 演示组件
const TimeRangeDemo = (args: React.ComponentProps<typeof TimeRangeInput>) => {
  const [startValue, setStartValue] = useState<Date | null>(args.startValue || null)
  const [endValue, setEndValue] = useState<Date | null>(args.endValue || null)

  return (
    <Panel className="w-96">
      <Panel.Row type="two-input-two-icon">
        <TimeRangeInput
          {...args}
          startValue={startValue}
          endValue={endValue}
          onStartChange={setStartValue}
          onEndChange={setEndValue}
        />
      </Panel.Row>
    </Panel>
  )
}

// 范围同步演示组件
const RangeSyncDemo = () => {
  const [startValue, setStartValue] = useState<Date | null>(timeStringToDate("09:00"))
  const [endValue, setEndValue] = useState<Date | null>(timeStringToDate("17:00"))

  const handleStartChange = (newStart: Date | null) => {
    console.log("🔥 Start onChange:", newStart)
    if (newStart) {
      // 计算当前range长度（毫秒），fallback为8小时
      const currentRange =
        startValue && endValue ? endValue.getTime() - startValue.getTime() : 8 * 60 * 60 * 1000
      // 保持range长度
      const newEnd = new Date(newStart.getTime() + currentRange)
      setStartValue(newStart)
      setEndValue(newEnd)
      console.log("🔥 Start推动:", {
        newStart: newStart.toTimeString(),
        newEnd: newEnd.toTimeString(),
        rangeHours: currentRange / (60 * 60 * 1000),
      })
    } else {
      setStartValue(newStart)
    }
  }

  const handleEndChange = (newEnd: Date | null) => {
    console.log("🔥 End onChange:", newEnd)
    if (newEnd && startValue && newEnd <= startValue) {
      // end <= start 时推动start
      setStartValue(newEnd)
      console.log("🔥 End推动start:", newEnd.toTimeString())
    }
    setEndValue(newEnd)
  }

  return (
    <div className="space-y-6">
      <Panel className="w-96">
        <Panel.Row type="two-input-two-icon">
          <TimeRangeInput
            startValue={startValue}
            endValue={endValue}
            onStartChange={handleStartChange}
            onEndChange={handleEndChange}
            startPlaceholder="开始时间"
            endPlaceholder="结束时间"
            format="HH:mm"
          />
        </Panel.Row>
      </Panel>

      <div className="space-y-4 text-sm">
        <div className="font-medium">🎯 时间范围同步逻辑</div>
        <div className="space-y-2 text-gray-600">
          <div>
            • <strong>开始时间变化</strong>：自动调整结束时间，保持原有范围长度
          </div>
          <div>
            • <strong>结束时间变化</strong>：如果 结束 ≤ 开始，则推动开始时间到结束位置
          </div>
          <div>
            • <strong>动态范围</strong>
            ：先调整结束时间设置想要的范围长度，然后开始时间的任何变化都会保持这个长度
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 p-4">
          <div className="font-medium text-blue-800">🧪 测试步骤</div>
          <div className="mt-2 space-y-1 text-blue-700">
            <div>1. 调整结束时间到比如 19:00 → 范围变成10小时</div>
            <div>2. 修改开始时间到 10:00 → 结束时间自动调整到 20:00 保持10小时距离</div>
            <div>3. 设置结束时间早于开始时间（如 08:00）→ 开始时间被推到 08:00</div>
            <div>4. 支持跨日范围：开始时间 22:00，结束时间次日 06:00</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 基础用法
export const Default: Story = {
  args: {
    startPlaceholder: "Start Time",
    endPlaceholder: "End Time",
    format: "HH:mm",
  },
  render: (args) => <TimeRangeDemo {...args} />,
}

// 时间范围同步
export const RangeSynchronization: Story = {
  render: () => <RangeSyncDemo />,
}

// 预设时间范围
export const WithPresetRange: Story = {
  args: {
    startValue: timeStringToDate("09:00"),
    endValue: timeStringToDate("17:30"),
    startPlaceholder: "工作开始时间",
    endPlaceholder: "工作结束时间",
    format: "HH:mm",
  },
  render: (args) => <TimeRangeDemo {...args} />,
}

// 跨日时间范围
export const CrossMidnight: Story = {
  args: {
    startValue: timeStringToDate("22:00"),
    endValue: timeStringToDate("06:00"),
    startPlaceholder: "夜班开始",
    endPlaceholder: "夜班结束",
    format: "HH:mm",
  },
  render: (args) => (
    <div className="space-y-4">
      <TimeRangeDemo {...args} />
      <div className="text-sm text-gray-600">
        💡 支持跨日时间范围（如夜班从 22:00 到次日 06:00）
      </div>
    </div>
  ),
}

// 不同时间格式
export const DifferentFormats: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 font-medium">24小时格式 (HH:mm)</h3>
        <TimeRangeDemo
          format="HH:mm"
          startPlaceholder="09:00"
          endPlaceholder="17:00"
          startValue={timeStringToDate("09:00")}
          endValue={timeStringToDate("17:00")}
        />
      </div>

      <div>
        <h3 className="mb-4 font-medium">12小时格式 (h:mm a)</h3>
        <TimeRangeDemo
          format="h:mm a"
          locale={enUS}
          startPlaceholder="9:00 AM"
          endPlaceholder="5:00 PM"
          startValue={timeStringToDate("09:00")}
          endValue={timeStringToDate("17:00")}
        />
      </div>

      <div>
        <h3 className="mb-4 font-medium">带秒格式 (HH:mm:ss)</h3>
        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
          <TimeRangeDemo
            format="HH:mm:ss"
            startPlaceholder="09:00:00"
            endPlaceholder="17:00:00"
            startValue={timeStringToDate("09:00")}
            endValue={timeStringToDate("17:00")}
          />
        </div>
      </div>
    </div>
  ),
}

// 国际化支持
export const Internationalization: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 font-medium">中文 (zh-CN)</h3>
        <TimeRangeDemo
          locale={zhCN}
          startPlaceholder="开始时间"
          endPlaceholder="结束时间"
          startValue={timeStringToDate("09:00")}
          endValue={timeStringToDate("17:30")}
        />
        <div className="mt-2 text-sm text-gray-500">持续时间显示：8小时30分钟</div>
      </div>

      <div>
        <h3 className="mb-4 font-medium">English (en-US)</h3>
        <TimeRangeDemo
          locale={enUS}
          format="h:mm a"
          startPlaceholder="Start Time"
          endPlaceholder="End Time"
          startValue={timeStringToDate("09:00")}
          endValue={timeStringToDate("17:30")}
        />
        <div className="mt-2 text-sm text-gray-500">Duration display: 8h 30m</div>
      </div>

      <div>
        <h3 className="mb-4 font-medium">日本語 (ja)</h3>
        <TimeRangeDemo
          locale={ja}
          startPlaceholder="開始時間"
          endPlaceholder="終了時間"
          startValue={timeStringToDate("09:00")}
          endValue={timeStringToDate("17:30")}
        />
        <div className="mt-2 text-sm text-gray-500">持続時間表示：8時間30分</div>
      </div>
    </div>
  ),
}

// 常见使用场景
export const CommonScenarios: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 font-medium">🏢 工作时间</h3>
        <TimeRangeDemo
          startValue={timeStringToDate("09:00")}
          endValue={timeStringToDate("18:00")}
          startPlaceholder="上班时间"
          endPlaceholder="下班时间"
        />
      </div>

      <div>
        <h3 className="mb-4 font-medium">🍽️ 用餐时间</h3>
        <TimeRangeDemo
          startValue={timeStringToDate("12:00")}
          endValue={timeStringToDate("13:00")}
          startPlaceholder="午餐开始"
          endPlaceholder="午餐结束"
        />
      </div>

      <div>
        <h3 className="mb-4 font-medium">🏃‍♂️ 锻炼时间</h3>
        <TimeRangeDemo
          startValue={timeStringToDate("06:30")}
          endValue={timeStringToDate("07:30")}
          startPlaceholder="开始锻炼"
          endPlaceholder="结束锻炼"
        />
      </div>

      <div>
        <h3 className="mb-4 font-medium">🌙 夜班时间</h3>
        <TimeRangeDemo
          startValue={timeStringToDate("22:00")}
          endValue={timeStringToDate("06:00")}
          startPlaceholder="夜班开始"
          endPlaceholder="夜班结束"
        />
        <div className="mt-2 text-sm text-gray-500">💡 跨日工作，持续8小时</div>
      </div>
    </div>
  ),
}

// 仅持续时间显示
export const DurationOnly: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 font-medium">短时间段</h3>
        <TimeRangeDemo
          startValue={timeStringToDate("14:00")}
          endValue={timeStringToDate("14:45")}
          startPlaceholder="会议开始"
          endPlaceholder="会议结束"
        />
      </div>

      <div>
        <h3 className="mb-4 font-medium">整点时间</h3>
        <TimeRangeDemo
          startValue={timeStringToDate("10:00")}
          endValue={timeStringToDate("12:00")}
          startPlaceholder="培训开始"
          endPlaceholder="培训结束"
        />
      </div>

      <div>
        <h3 className="mb-4 font-medium">长时间段</h3>
        <TimeRangeDemo
          startValue={timeStringToDate("08:00")}
          endValue={timeStringToDate("20:00")}
          startPlaceholder="营业开始"
          endPlaceholder="营业结束"
        />
      </div>
    </div>
  ),
}
