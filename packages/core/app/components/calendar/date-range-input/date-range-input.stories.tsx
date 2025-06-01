import type { Meta, StoryObj } from "@storybook/react"
import { addDays, addHours, subDays } from "date-fns"
import { enUS, ja, ko, zhCN } from "date-fns/locale"
import React, { useState } from "react"
import { Panel } from "../../panel"
import { DateRangeInput } from "./date-range-input"

const meta: Meta<typeof DateRangeInput> = {
  title: "DateAndTime/DateRangeInput",
  component: DateRangeInput,
  parameters: {
    layout: "centered",
  },
  tags: ["new"],
  argTypes: {
    locale: {
      control: { type: "select" },
      options: ["enUS", "zhCN", "ja", "ko"],
      mapping: { enUS, zhCN, ja, ko },
      description: "语言环境",
    },
    format: {
      control: { type: "text" },
      description: "日期格式",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 演示组件
const DateRangeDemo = (args: React.ComponentProps<typeof DateRangeInput>) => {
  const [startValue, setStartValue] = useState<Date | null>(args.startValue || null)
  const [endValue, setEndValue] = useState<Date | null>(args.endValue || null)

  return (
    <Panel className="w-96">
      <Panel.Row type="two-input-two-icon">
        <DateRangeInput
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
  const [startValue, setStartValue] = useState<Date | null>(new Date())
  const [endValue, setEndValue] = useState<Date | null>(addDays(new Date(), 3))

  const handleStartChange = (newStart: Date | null) => {
    console.log("🔥 Start onChange:", newStart)
    if (newStart) {
      // 计算当前range长度（毫秒），fallback为1天
      const currentRange =
        startValue && endValue ? endValue.getTime() - startValue.getTime() : 1 * 24 * 60 * 60 * 1000
      // 保持range长度
      const newEnd = new Date(newStart.getTime() + currentRange)
      setStartValue(newStart)
      setEndValue(newEnd)
      console.log("🔥 Start推动:", {
        newStart: newStart.toISOString(),
        newEnd: newEnd.toISOString(),
        rangeDays: currentRange / (24 * 60 * 60 * 1000),
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
      console.log("🔥 End推动start:", newEnd.toISOString())
    }
    setEndValue(newEnd)
  }

  return (
    <div className="space-y-6">
      <Panel className="w-96">
        <Panel.Row type="two-input-two-icon">
          <DateRangeInput
            startValue={startValue}
            endValue={endValue}
            onStartChange={handleStartChange}
            onEndChange={handleEndChange}
            startPlaceholder="开始日期"
            endPlaceholder="结束日期"
            locale={zhCN}
          />
        </Panel.Row>
      </Panel>

      <div className="space-y-4 text-sm">
        <div className="font-medium">🎯 范围同步逻辑</div>
        <div className="space-y-2 text-gray-600">
          <div>
            • <strong>开始日期变化</strong>：自动调整结束日期，保持原有范围长度
          </div>
          <div>
            • <strong>结束日期变化</strong>：如果 结束 ≤ 开始，则推动开始日期到结束位置
          </div>
          <div>
            • <strong>动态范围</strong>
            ：先调整结束日期设置想要的范围长度，然后开始日期的任何变化都会保持这个长度
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 p-4">
          <div className="font-medium text-blue-800">🧪 测试步骤</div>
          <div className="mt-2 space-y-1 text-blue-700">
            <div>1. 调整结束日期到5天后 → 范围变成5天</div>
            <div>2. 修改开始日期 → 结束日期自动调整保持5天距离</div>
            <div>3. 设置结束日期早于开始日期 → 开始日期被推到结束位置</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 基础用法
export const Default: Story = {
  args: {
    startPlaceholder: "Start Date",
    endPlaceholder: "End Date",
    format: "yyyy-MM-dd",
    locale: enUS,
  },
  render: (args) => <DateRangeDemo {...args} />,
}

// 范围同步
export const RangeSynchronization: Story = {
  render: () => <RangeSyncDemo />,
}

// 预设日期范围
export const WithPresetRange: Story = {
  args: {
    startValue: new Date(),
    endValue: addDays(new Date(), 7),
    startPlaceholder: "开始日期",
    endPlaceholder: "结束日期",
    format: "yyyy-MM-dd",
    locale: zhCN,
  },
  render: (args) => <DateRangeDemo {...args} />,
}

// 国际化支持
export const Internationalization: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 font-medium">中文 (zh-CN)</h3>
        <DateRangeDemo
          locale={zhCN}
          startValue={new Date()}
          endValue={addDays(new Date(), 7)}
          startPlaceholder="开始日期"
          endPlaceholder="结束日期"
          format="yyyy年MM月dd日"
        />
        <div className="mt-2 text-sm text-gray-500">范围显示：7 天</div>
      </div>

      <div>
        <h3 className="mb-4 font-medium">English (en-US)</h3>
        <DateRangeDemo
          locale={enUS}
          startValue={new Date()}
          endValue={addDays(new Date(), 7)}
          startPlaceholder="Start Date"
          endPlaceholder="End Date"
          format="MM/dd/yyyy"
        />
        <div className="mt-2 text-sm text-gray-500">Range display: 7 days</div>
      </div>

      <div>
        <h3 className="mb-4 font-medium">日本語 (ja)</h3>
        <DateRangeDemo
          locale={ja}
          startValue={new Date()}
          endValue={addDays(new Date(), 7)}
          startPlaceholder="開始日"
          endPlaceholder="終了日"
          format="yyyy/MM/dd"
        />
        <div className="mt-2 text-sm text-gray-500">範囲表示：7日</div>
      </div>

      <div>
        <h3 className="mb-4 font-medium">한국어 (ko)</h3>
        <DateRangeDemo
          locale={ko}
          startValue={new Date()}
          endValue={addDays(new Date(), 7)}
          startPlaceholder="시작일"
          endPlaceholder="종료일"
          format="yyyy.MM.dd"
        />
        <div className="mt-2 text-sm text-gray-500">범위 표시：7일</div>
      </div>
    </div>
  ),
}

// 不同日期格式
export const DifferentFormats: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 font-medium">ISO 格式 (yyyy-MM-dd)</h3>
        <DateRangeDemo
          format="yyyy-MM-dd"
          startValue={new Date()}
          endValue={addDays(new Date(), 3)}
          locale={enUS}
        />
      </div>

      <div>
        <h3 className="mb-4 font-medium">美式格式 (MM/dd/yyyy)</h3>
        <DateRangeDemo
          format="MM/dd/yyyy"
          startValue={new Date()}
          endValue={addDays(new Date(), 3)}
          locale={enUS}
        />
      </div>

      <div>
        <h3 className="mb-4 font-medium">中文格式 (yyyy年MM月dd日)</h3>
        <DateRangeDemo
          format="yyyy年MM月dd日"
          startValue={new Date()}
          endValue={addDays(new Date(), 3)}
          locale={zhCN}
        />
      </div>

      <div>
        <h3 className="mb-4 font-medium">欧式格式 (dd.MM.yyyy)</h3>
        <DateRangeDemo
          format="dd.MM.yyyy"
          startValue={new Date()}
          endValue={addDays(new Date(), 3)}
          locale={enUS}
        />
      </div>
    </div>
  ),
}

// 常见使用场景
export const CommonScenarios: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 font-medium">🏖️ 假期规划</h3>
        <DateRangeDemo
          startValue={addDays(new Date(), 30)}
          endValue={addDays(new Date(), 37)}
          startPlaceholder="假期开始"
          endPlaceholder="假期结束"
          locale={zhCN}
          format="yyyy年MM月dd日"
        />
        <div className="mt-2 text-sm text-gray-500">💡 规划一周假期，显示总天数</div>
      </div>

      <div>
        <h3 className="mb-4 font-medium">📊 数据分析周期</h3>
        <DateRangeDemo
          startValue={subDays(new Date(), 30)}
          endValue={new Date()}
          startPlaceholder="Start Period"
          endPlaceholder="End Period"
          locale={enUS}
          format="yyyy-MM-dd"
        />
        <div className="mt-2 text-sm text-gray-500">💡 过去30天的数据分析期间</div>
      </div>

      <div>
        <h3 className="mb-4 font-medium">🎫 活动时间</h3>
        <DateRangeDemo
          startValue={addDays(new Date(), 15)}
          endValue={addDays(new Date(), 17)}
          startPlaceholder="活動開始"
          endPlaceholder="活動終了"
          locale={ja}
          format="yyyy/MM/dd"
        />
        <div className="mt-2 text-sm text-gray-500">💡 3天活动期间，日本语环境</div>
      </div>
    </div>
  ),
}

// 边界情况
export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 font-medium">相同时间点</h3>
        <DateRangeDemo
          startValue={new Date()}
          endValue={new Date()}
          locale={enUS}
        />
        <div className="mt-2 text-sm text-gray-500">💡 相同时间点显示为1天</div>
      </div>

      <div>
        <h3 className="mb-4 font-medium">反向时间范围</h3>
        <DateRangeDemo
          startValue={addDays(new Date(), 5)}
          endValue={new Date()}
          locale={enUS}
        />
        <div className="mt-2 text-sm text-gray-500">💡 反向范围显示绝对值差距</div>
      </div>

      <div>
        <h3 className="mb-4 font-medium">跨年范围</h3>
        <DateRangeDemo
          startValue={new Date("2024-12-25")}
          endValue={new Date("2025-01-05")}
          locale={zhCN}
          format="yyyy年MM月dd日"
        />
        <div className="mt-2 text-sm text-gray-500">💡 跨年日期范围计算</div>
      </div>
    </div>
  ),
}

// 禁用状态
export const DisabledStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 font-medium">开始日期禁用</h3>
        <DateRangeDemo
          startValue={new Date()}
          endValue={addDays(new Date(), 7)}
          startDisabled={true}
          locale={enUS}
        />
      </div>

      <div>
        <h3 className="mb-4 font-medium">结束日期禁用</h3>
        <DateRangeDemo
          startValue={new Date()}
          endValue={addDays(new Date(), 7)}
          endDisabled={true}
          locale={enUS}
        />
      </div>

      <div>
        <h3 className="mb-4 font-medium">全部禁用</h3>
        <DateRangeDemo
          startValue={new Date()}
          endValue={addDays(new Date(), 7)}
          startDisabled={true}
          endDisabled={true}
          locale={enUS}
        />
      </div>
    </div>
  ),
}
