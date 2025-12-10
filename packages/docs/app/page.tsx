"use client"

import {
  Button,
  Avatar,
  Input,
  Switch,
  Checkbox,
  RadioGroup,
  Select,
  Textarea,
  tcx,
} from "@choice-ui/react"
import Link from "next/link"
import { ArrowRight, Github, CreditCard } from "lucide-react"
import { useState } from "react"

// --- Components Wrappers for Demo ---

function DemoCard({
  className,
  children,
  title,
  description,
  footer,
}: {
  className?: string
  children: React.ReactNode
  title?: string
  description?: string
  footer?: React.ReactNode
}) {
  return (
    <div
      className={tcx("text-default-foreground bg-default-background rounded-xl border", className)}
    >
      {(title || description) && (
        <div className="flex flex-col space-y-1.5 p-6">
          {title && <h3 className="leading-none font-semibold tracking-tight">{title}</h3>}
          {description && <p className="text-secondary-foreground text-sm">{description}</p>}
        </div>
      )}
      <div className="p-6 pt-0">{children}</div>
      {footer && <div className="flex items-center p-6 pt-0">{footer}</div>}
    </div>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <label
      className={`text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    >
      {children}
    </label>
  )
}

// --- Demo: Payment Method ---
function PaymentMethodDemo() {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [month, setMonth] = useState("1")
  const [year, setYear] = useState("2024")

  return (
    <DemoCard
      title="Payment Method"
      description="Add a new payment method to your account."
      footer={<Button className="w-full">Continue</Button>}
      className="w-full max-w-md"
    >
      <div className="grid gap-6">
        <RadioGroup
          value={paymentMethod}
          onChange={setPaymentMethod}
          className="grid grid-cols-3 gap-4"
        >
          <RadioGroup.Item
            value="card"
            id="card"
            className="peer sr-only"
          >
            <span></span>
          </RadioGroup.Item>
          <label
            htmlFor="card"
            className={tcx(
              "hover:text-accent-foreground flex flex-col items-center justify-between rounded-lg border-2 p-4",
              paymentMethod === "card" ? "border-selected-boundary" : "border-default-boundary",
            )}
            onClick={() => setPaymentMethod("card")}
          >
            <CreditCard className="mb-3 h-6 w-6" />
            Card
          </label>

          <RadioGroup.Item
            value="paypal"
            id="paypal"
            className="peer sr-only"
          >
            <span></span>
          </RadioGroup.Item>
          <label
            htmlFor="paypal"
            className={tcx(
              "hover:text-accent-foreground flex flex-col items-center justify-between rounded-lg border-2 p-4",
              paymentMethod === "paypal" ? "border-selected-boundary" : "border-default-boundary",
            )}
            onClick={() => setPaymentMethod("paypal")}
          >
            {/* Mock Paypal Icon */}
            <div className="mb-3 h-6 w-6 text-xl font-bold">P</div>
            Paypal
          </label>

          <RadioGroup.Item
            value="apple"
            id="apple"
            className="peer sr-only"
          >
            <span></span>
          </RadioGroup.Item>
          <label
            htmlFor="apple"
            className={tcx(
              "hover:text-accent-foreground flex flex-col items-center justify-between rounded-lg border-2 p-4",
              paymentMethod === "apple" ? "border-selected-boundary" : "border-default-boundary",
            )}
            onClick={() => setPaymentMethod("apple")}
          >
            {/* Mock Apple Icon */}
            <div className="mb-3 h-6 w-6 text-xl font-bold"></div>
            Apple
          </label>
        </RadioGroup>

        <div className="grid gap-2">
          <Label>Name</Label>
          <Input placeholder="First Last" />
        </div>
        <div className="grid gap-2">
          <Label>Card number</Label>
          <Input placeholder="" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="grid gap-2">
            <Label>Expires</Label>
            <Select
              value={month}
              onChange={setMonth}
            >
              <Select.Trigger>
                <Select.Value placeholder="Month">{null}</Select.Value>
              </Select.Trigger>
              <Select.Content>
                {Array.from({ length: 12 }).map((_, i) => (
                  <Select.Item
                    key={i}
                    value={`${i + 1}`}
                  >
                    {new Date(0, i).toLocaleString("default", { month: "long" })}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Year</Label>
            <Select
              value={year}
              onChange={setYear}
            >
              <Select.Trigger>
                <Select.Value placeholder="Year">{null}</Select.Value>
              </Select.Trigger>
              <Select.Content>
                {Array.from({ length: 10 }).map((_, i) => (
                  <Select.Item
                    key={i}
                    value={`${2024 + i}`}
                  >
                    {2024 + i}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>CVC</Label>
            <Input placeholder="CVC" />
          </div>
        </div>
      </div>
    </DemoCard>
  )
}

// --- Demo: Team Members ---
function TeamMembersDemo() {
  const members = [
    {
      name: "Sofia Davis",
      email: "m@example.com",
      role: "Owner",
      avatar: "https://i.pravatar.cc/150?u=1",
    },
    {
      name: "Jackson Lee",
      email: "p@example.com",
      role: "Member",
      avatar: "https://i.pravatar.cc/150?u=2",
    },
    {
      name: "Isabella Nguyen",
      email: "i@example.com",
      role: "Member",
      avatar: "https://i.pravatar.cc/150?u=3",
    },
  ]

  const [memberRoles, setMemberRoles] = useState(members.map((m) => m.role.toLowerCase()))

  return (
    <DemoCard
      title="Team Members"
      description="Invite your team members to collaborate."
      className="w-full max-w-md"
    >
      <div className="flex flex-col gap-6">
        {members.map((member, i) => (
          <div
            key={i}
            className="flex items-center justify-between space-x-4"
          >
            <div className="flex items-center space-x-4">
              <Avatar
                photo={member.avatar}
                name={member.name}
              />
              <div>
                <p className="text-sm leading-none font-medium">{member.name}</p>
                <p className="text-secondary-foreground text-sm">{member.email}</p>
              </div>
            </div>
            <div className="w-[110px]">
              <Select
                value={memberRoles[i]}
                onChange={(val) => {
                  const newRoles = [...memberRoles]
                  newRoles[i] = val
                  setMemberRoles(newRoles)
                }}
              >
                <Select.Trigger>
                  <Select.Value>{null}</Select.Value>
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="owner">Owner</Select.Item>
                  <Select.Item value="member">Member</Select.Item>
                  <Select.Item value="billing">Billing</Select.Item>
                  <Select.Item value="developer">Developer</Select.Item>
                </Select.Content>
              </Select>
            </div>
          </div>
        ))}
      </div>
    </DemoCard>
  )
}

// --- Demo: Report Issue ---
function ReportIssueDemo() {
  const [area, setArea] = useState("billing")
  const [securityLevel, setSecurityLevel] = useState("2")

  return (
    <DemoCard
      title="Report an issue"
      description="What area are you having problems with?"
      footer={
        <div className="flex w-full justify-between">
          <Button variant="ghost">Cancel</Button>
          <Button>Submit</Button>
        </div>
      }
      className="w-full max-w-md"
    >
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label>Area</Label>
            <Select
              value={area}
              onChange={setArea}
            >
              <Select.Trigger>
                <Select.Value>{null}</Select.Value>
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="team">Team</Select.Item>
                <Select.Item value="billing">Billing</Select.Item>
                <Select.Item value="account">Account</Select.Item>
                <Select.Item value="deployments">Deployments</Select.Item>
                <Select.Item value="support">Support</Select.Item>
              </Select.Content>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Security Level</Label>
            <Select
              value={securityLevel}
              onChange={setSecurityLevel}
            >
              <Select.Trigger>
                <Select.Value>{null}</Select.Value>
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="1">Severity 1 (Highest)</Select.Item>
                <Select.Item value="2">Severity 2</Select.Item>
                <Select.Item value="3">Severity 3</Select.Item>
                <Select.Item value="4">Severity 4 (Lowest)</Select.Item>
              </Select.Content>
            </Select>
          </div>
        </div>
        <div className="grid gap-2">
          <Label>Subject</Label>
          <Input placeholder="I need help with..." />
        </div>
        <div className="grid gap-2">
          <Label>Description</Label>
          <Textarea
            placeholder="Please include all information relevant to your issue."
            className="min-h-[100px]"
          />
        </div>
      </div>
    </DemoCard>
  )
}

// --- Demo: Create Account ---
function CreateAccountDemo() {
  return (
    <DemoCard
      title="Create an account"
      description="Enter your email below to create your account"
      footer={<Button className="w-full">Create account</Button>}
      className="w-full max-w-md"
    >
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          <Button
            variant="secondary"
            className="w-full"
          >
            <Github className="mr-2 h-4 w-4" />
            Github
          </Button>
          <Button
            variant="secondary"
            className="w-full"
          >
            {/* Mock Google Icon */}
            <div className="mr-2 h-4 w-4 font-bold">G</div>
            Google
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="text-secondary-foreground bg-white px-2 dark:bg-zinc-900">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid gap-2">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="m@example.com"
          />
        </div>
        <div className="grid gap-2">
          <Label>Password</Label>
          <Input type="password" />
        </div>
      </div>
    </DemoCard>
  )
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center py-24">
      {/* Hero Section */}
      <div className="container mb-20 flex flex-col items-center space-y-4 px-4 text-center md:px-6">
        <Link
          href="/docs/guide/installation"
          className="bg-secondary-background inline-flex items-center rounded-lg px-3 py-1 text-sm font-medium"
        >
          <span className="bg-primary-500 mr-2 flex h-2 w-2 rounded-full"></span>
          v1.0.0 is now available
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
        <h1 className="from-foreground to-foreground/70 bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tighter text-transparent md:text-6xl lg:text-7xl">
          The Foundation for your <br className="hidden sm:inline" /> Design System
        </h1>
        <p className="text-secondary-foreground mx-auto max-w-[700px] text-lg md:text-xl">
          A set of beautifully designed components that you can customize, extend, and build on.
          Open Source. Open Code.
        </p>
        <div className="mt-6 flex gap-4">
          <Link href="/docs/guide/installation">
            <Button
              size="default"
              className="h-12 rounded-md px-8 font-medium"
            >
              Get Started
            </Button>
          </Link>
          <Link href="/docs/components">
            <Button
              variant="secondary"
              size="default"
              className="h-12 rounded-md border bg-white px-8 font-medium dark:bg-zinc-900"
            >
              View Components
            </Button>
          </Link>
        </div>
      </div>

      {/* Components Grid Showcase */}
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {/* Column 1 */}
          <div className="grid gap-6 lg:gap-8">
            <PaymentMethodDemo />
            <CreateAccountDemo />
          </div>

          {/* Column 2 */}
          <div className="grid gap-6 lg:gap-8">
            <TeamMembersDemo />
            <div className="space-y-6">
              {/* Floating small cards */}
              <DemoCard className="w-full">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm leading-none font-medium">Notifications</p>
                    <p className="text-secondary-foreground text-sm">Enable push notifications.</p>
                  </div>
                  <Switch
                    value={true}
                    onChange={() => {}}
                  />
                </div>
              </DemoCard>
              <DemoCard className="w-full">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm leading-none font-medium">Dark Mode</p>
                    <p className="text-secondary-foreground text-sm">Switch to dark theme.</p>
                  </div>
                  <Switch
                    value={false}
                    onChange={() => {}}
                  />
                </div>
              </DemoCard>
            </div>
          </div>

          {/* Column 3 */}
          <div className="grid gap-6 lg:gap-8">
            <ReportIssueDemo />
            {/* Cookie Settings Demo */}
            <DemoCard
              title="Cookie Settings"
              description="Manage your cookie settings here."
              footer={
                <Button
                  className="w-full"
                  variant="secondary"
                >
                  Save preferences
                </Button>
              }
              className="w-full max-w-md"
            >
              <div className="grid gap-6">
                <div className="flex items-start space-y-0 space-x-3">
                  <Checkbox
                    defaultChecked
                    id="strictly"
                    disabled
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="strictly"
                      className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Strictly Necessary
                    </label>
                    <p className="text-secondary-foreground text-sm">
                      These cookies are essential in order to use the website and use its features.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-y-0 space-x-3">
                  <Checkbox id="functional" />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="functional"
                      className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Functional Cookies
                    </label>
                    <p className="text-secondary-foreground text-sm">
                      These cookies allow the website to provide personalized functionality.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-y-0 space-x-3">
                  <Checkbox id="performance" />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="performance"
                      className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Performance Cookies
                    </label>
                    <p className="text-secondary-foreground text-sm">
                      These cookies help to improve the performance of the website.
                    </p>
                  </div>
                </div>
              </div>
            </DemoCard>
          </div>
        </div>
      </div>

      <div className="h-20" />
    </main>
  )
}
