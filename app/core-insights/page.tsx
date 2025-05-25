"use client"

import Link from "next/link"
import Image from "next/image"
import { BarChart3, Activity, TrendingUp, Target, Lightbulb, Timer, Footprints } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

function CoreInsightsPage() {
  // State for interactive elements
  const [hoveredWinRatePoint, setHoveredWinRatePoint] = useState<number | null>(null)
  const [hoveredShotPoint, setHoveredShotPoint] = useState<number | null>(null)
  const [hoveredPositionPoint, setHoveredPositionPoint] = useState<number | null>(null)
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [selectedShotType, setSelectedShotType] = useState<string | null>(null)
  const [selectedGameIndex, setSelectedGameIndex] = useState<number | null>(null)

  // Data for win rate chart
  const winRateData = [
    { month: "Jan", value: 60, label: "60%" },
    { month: "Feb", value: 65, label: "65%" },
    { month: "Mar", value: 55, label: "55%" },
    { month: "Apr", value: 58, label: "58%" },
    { month: "May", value: 50, label: "50%" },
    { month: "Jun", value: 32, label: "32%" },
  ]

  // Data for shot accuracy chart
  const shotAccuracyData = [
    { month: "Jan", value: 40, label: "40%" },
    { month: "Feb", value: 45, label: "45%" },
    { month: "Mar", value: 38, label: "38%" },
    { month: "Apr", value: 30, label: "30%" },
    { month: "May", value: 25, label: "25%" },
    { month: "Jun", value: 20, label: "20%" },
  ]

  // Data for T position control chart
  const tPositionData = [
    { month: "Jan", value: 50, label: "50%" },
    { month: "Feb", value: 55, label: "55%" },
    { month: "Mar", value: 48, label: "48%" },
    { month: "Apr", value: 45, label: "45%" },
    { month: "May", value: 40, label: "40%" },
    { month: "Jun", value: 30, label: "30%" },
  ]

  // Data for skills assessment
  const skillsData = [
    { name: "Technique", value: 85, position: { x: 50, y: 10 } },
    { name: "Mental", value: 82, position: { x: 90, y: 50 } },
    { name: "Speed", value: 88, position: { x: 85, y: 30 } },
    { name: "Power", value: 75, position: { x: 75, y: 85 } },
    { name: "Fitness", value: 80, position: { x: 50, y: 80 } },
    { name: "Consistency", value: 72, position: { x: 15, y: 70 } },
    { name: "Tactics", value: 78, position: { x: 10, y: 50 } },
    { name: "Deception", value: 68, position: { x: 25, y: 15 } },
  ]

  // Shot type distribution data
  const shotTypeData = [
    { type: "Drives", percentage: 42, height: "80%", color: "bg-blue-500" },
    { type: "Volleys", percentage: 28, height: "60%", color: "bg-green-500" },
    { type: "Drops", percentage: 15, height: "40%", color: "bg-yellow-500" },
    { type: "Boasts", percentage: 8, height: "25%", color: "bg-red-500" },
    { type: "Lobs", percentage: 7, height: "15%", color: "bg-purple-500" },
  ]

  // Opponent shot type distribution data
  const opponentShotTypeData = [
    { type: "Drives", percentage: 35, height: "70%", color: "bg-blue-500" },
    { type: "Volleys", percentage: 20, height: "40%", color: "bg-green-500" },
    { type: "Drops", percentage: 22, height: "44%", color: "bg-yellow-500" },
    { type: "Boasts", percentage: 15, height: "30%", color: "bg-red-500" },
    { type: "Lobs", percentage: 8, height: "16%", color: "bg-purple-500" },
  ]

  // Game performance data
  const gamePerformanceData = [
    { game: 1, winners: 60, errors: 30 },
    { game: 2, winners: 50, errors: 35 },
    { game: 3, winners: 40, errors: 55 },
    { game: 4, winners: 65, errors: 25 },
  ]

  // T position control data
  const tControlData = [
    { game: 1, you: 65, opponent: 55 },
    { game: 2, you: 70, opponent: 50 },
    { game: 3, you: 60, opponent: 45 },
    { game: 4, you: 75, opponent: 40 },
    { game: 5, you: 80, opponent: 45 },
    { game: 6, you: 85, opponent: 35 },
  ]

  // Zone performance data
  const zoneData = [
    { zone: "Front Right (FR)", success: 82, color: "bg-green-500", textColor: "text-green-600" },
    { zone: "Front Left (FL)", success: 75, color: "bg-green-500", textColor: "text-green-600" },
    { zone: "Back Right (BR)", success: 58, color: "bg-yellow-500", textColor: "text-yellow-600" },
    { zone: "Back Left (BL)", success: 45, color: "bg-red-500", textColor: "text-red-600" },
  ]

  // Rally length distribution data
  const rallyLengthData = [
    { range: "1-5", percentage: 15, height: "30%", color: "bg-blue-300" },
    { range: "6-10", percentage: 25, height: "50%", color: "bg-blue-400" },
    { range: "11-15", percentage: 40, height: "80%", color: "bg-blue-500" },
    { range: "16-20", percentage: 30, height: "60%", color: "bg-blue-600" },
    { range: "21+", percentage: 20, height: "40%", color: "bg-blue-700" },
  ]

  // Critical points data
  const criticalPointsData = {
    outcomes: [
      { type: "Winners", percentage: 42, color: "bg-green-500" },
      { type: "Forced Errors", percentage: 28, color: "bg-blue-500" },
      { type: "Unforced Errors", percentage: 18, color: "bg-red-500" },
      { type: "Let/Stroke", percentage: 12, color: "bg-amber-500" },
    ],
    byGame: [
      { game: 1, success: 55, total: 20, won: 11 },
      { game: 2, success: 62, total: 26, won: 16 },
      { game: 3, success: 42, total: 31, won: 13 },
      { game: 4, success: 68, total: 22, won: 15 },
    ],
  }

  // Critical points table data
  const criticalPointsTableData = [
    { game: 1, score: "8-7", outcome: "Winner", shotType: "Forehand Drive", position: "Front Right" },
    { game: 1, score: "9-8", outcome: "Forced Error", shotType: "Backhand Volley", position: "Middle" },
    { game: 2, score: "7-7", outcome: "Winner", shotType: "Forehand Drop", position: "Front Left" },
    { game: 2, score: "10-9", outcome: "Unforced Error", shotType: "Backhand Drive", position: "Back Left" },
    { game: 3, score: "8-9", outcome: "Let", shotType: "Forehand Volley", position: "Middle" },
    { game: 3, score: "9-10", outcome: "Forced Error", shotType: "Backhand Lob", position: "Back Right" },
    { game: 4, score: "10-8", outcome: "Winner", shotType: "Forehand Volley", position: "Front Right" },
  ]

  // Movement analysis data
  const movementData = {
    recoveryTime: {
      you: 1.8,
      opponent: 2.1,
      unit: "seconds",
    },
    totalDistance: {
      you: 2.4,
      opponent: 2.7,
      unit: "km",
    },
    averageSpeed: [
      { game: 1, you: 1.8, opponent: 1.7 },
      { game: 2, you: 1.9, opponent: 1.8 },
      { game: 3, you: 1.7, opponent: 1.8 },
      { game: 4, you: 1.9, opponent: 1.6 },
    ],
  }

  // Shot speed data
  const shotSpeedData = {
    forehand: {
      drive: 145,
      volley: 125,
      drop: 90,
    },
    backhand: {
      drive: 130,
      volley: 115,
      drop: 85,
    },
    average: 132,
    max: 158,
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Core Insights</h1>
          <p className="text-muted-foreground">
            Comprehensive analytics and metrics we capture to elevate your squash game
          </p>
        </div>

      </div>

      <Separator className="my-6" />

      {/* Introduction Section */}
      <section className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="bg-muted rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3">Understanding Your Squash Analytics</h2>
            <p className="mb-4 text-sm">
              Core Analytics uses advanced AI technology to analyze every aspect of your squash game, providing
              actionable insights to improve your performance. Our system tracks shot types, court positioning, movement
              patterns, and game statistics to give you a complete picture of your strengths and areas for improvement.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div className="flex items-start gap-2">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-2 mt-1">
                  <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Performance Tracking</h3>
                  <p className="text-xs text-muted-foreground">Monitor your progress over time</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="rounded-full bg-green-100 dark:bg-green-900 p-2 mt-1">
                  <Target className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Shot Analysis</h3>
                  <p className="text-xs text-muted-foreground">Detailed shot breakdown</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="rounded-full bg-amber-100 dark:bg-amber-900 p-2 mt-1">
                  <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Actionable Insights</h3>
                  <p className="text-xs text-muted-foreground">Personalized recommendations</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[300px] rounded-lg overflow-hidden">
            <Image
              src="/images/squash-analytics-overlay.jpeg"
              alt="Professional squash player with performance analytics overlay"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Performance Overview Section */}
      <section className="mb-12" id="performance-overview">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Performance Overview</h2>
          <Badge variant="outline" className="text-xs">
            Last 6 Months
          </Badge>
        </div>

        <p className="text-muted-foreground mb-6 text-sm">
          Your key performance metrics show how your game has evolved over time. These indicators help identify trends
          and patterns in your play, allowing you to focus your training on specific areas.
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800 transition-all duration-200 hover:shadow-md hover:-translate-y-1">
            <CardContent className="p-3">
              <div className="flex flex-col items-center text-center space-y-1">
                <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <CardTitle className="text-sm">Win Rate</CardTitle>
                <p className="text-xl font-bold text-blue-600 dark:text-blue-400">68%</p>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800 transition-all duration-200 hover:shadow-md hover:-translate-y-1">
            <CardContent className="p-3">
              <div className="flex flex-col items-center text-center space-y-1">
                <Target className="h-5 w-5 text-green-600 dark:text-green-400" />
                <CardTitle className="text-sm">Shot Accuracy</CardTitle>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">78%</p>
                <p className="text-xs text-muted-foreground">+3% from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800 transition-all duration-200 hover:shadow-md hover:-translate-y-1">
            <CardContent className="p-3">
              <div className="flex flex-col items-center text-center space-y-1">
                <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <CardTitle className="text-sm">Rally Length</CardTitle>
                <p className="text-xl font-bold text-purple-600 dark:text-purple-400">12.4</p>
                <p className="text-xs text-muted-foreground">Avg. shots per rally</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-amber-200 dark:border-amber-800 transition-all duration-200 hover:shadow-md hover:-translate-y-1">
            <CardContent className="p-3">
              <div className="flex flex-col items-center text-center space-y-1">
                <TrendingUp className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <CardTitle className="text-sm">T Position</CardTitle>
                <p className="text-xl font-bold text-amber-600 dark:text-amber-400">65%</p>
                <p className="text-xs text-muted-foreground">Control rate</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Performance Trend Line Graph */}
          <Card>
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-base">Performance Trends</CardTitle>
              <CardDescription className="text-xs">Track your progress over time</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-40 relative">
                {/* X and Y axes */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-300"></div>
                <div className="absolute bottom-0 left-0 w-0.5 h-full bg-gray-300"></div>

                {/* X-axis labels */}
                {winRateData.map((item, index) => (
                  <div
                    key={`x-label-${index}`}
                    className="absolute bottom-[-15px] transform -translate-x-1/2 text-[9px] text-gray-500"
                    style={{ left: `${(index / (winRateData.length - 1)) * 100}%` }}
                  >
                    {item.month}
                  </div>
                ))}

                {/* Y-axis labels */}
                <div className="absolute top-0 left-[-20px] text-[9px] text-gray-500">100%</div>
                <div className="absolute top-[50%] left-[-20px] text-[9px] text-gray-500">50%</div>
                <div className="absolute bottom-0 left-[-20px] text-[9px] text-gray-500">0%</div>

                {/* Grid lines */}
                <div className="absolute top-[50%] left-0 w-full h-0.5 bg-gray-100"></div>

                {/* Line graph - Win Rate */}
                <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                  {/* Line */}
                  <polyline
                    points={winRateData
                      .map((item, index) => `${(index / (winRateData.length - 1)) * 100}%,${item.value}%`)
                      .join(" ")}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Area under the line */}
                  <polyline
                    points={`
                      ${winRateData
                        .map((item, index) => `${(index / (winRateData.length - 1)) * 100}%,${item.value}%`)
                        .join(" ")} 
                      100%,100% 0,100%
                    `}
                    fill="url(#blue-gradient)"
                    fillOpacity="0.2"
                  />
                  <defs>
                    <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Line graph - Shot Accuracy */}
                <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                  {/* Line */}
                  <polyline
                    points={shotAccuracyData
                      .map((item, index) => `${(index / (shotAccuracyData.length - 1)) * 100}%,${item.value}%`)
                      .join(" ")}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Line graph - T Position Control */}
                <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                  {/* Line */}
                  <polyline
                    points={tPositionData
                      .map((item, index) => `${(index / (tPositionData.length - 1)) * 100}%,${item.value}%`)
                      .join(" ")}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Interactive data points - Win Rate */}
                {winRateData.map((item, index) => (
                  <TooltipProvider key={`win-rate-point-${index}`}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className={`absolute h-2 w-2 rounded-full bg-blue-500 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${hoveredWinRatePoint === index ? "h-3 w-3 ring-1 ring-blue-300" : ""}`}
                          style={{
                            top: `${item.value}%`,
                            left: `${(index / (winRateData.length - 1)) * 100}%`,
                          }}
                          onMouseEnter={() => setHoveredWinRatePoint(index)}
                          onMouseLeave={() => setHoveredWinRatePoint(null)}
                        ></div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-xs font-medium">Win Rate: {item.label}</div>
                        <div className="text-xs text-muted-foreground">{item.month} 2023</div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}

                {/* Legend */}
                <div className="absolute top-1 right-1 bg-white/80 dark:bg-gray-800/80 p-1 rounded text-[8px] flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span>Win Rate</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>Shot Accuracy</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                    <span>T Position</span>
                  </div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground mt-4">
                <p>
                  <strong>Analysis:</strong> Your win rate peaked in February at 65% but shows a concerning drop in
                  June. Shot accuracy has been declining, which may be contributing to the recent win rate decrease.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="relative h-[250px] rounded-lg overflow-hidden">
            <Image
              src="/images/player-stretch.jpeg"
              alt="Professional squash player stretching for a shot"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* 1. SKILLS ASSESSMENT SECTION */}
      <section className="mb-12" id="skills-assessment">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">1. Skills Assessment</h2>
          <Badge variant="outline" className="text-xs">
            Updated Monthly
          </Badge>
        </div>

        <p className="text-muted-foreground mb-6 text-sm">
          This comprehensive evaluation of your key squash skills helps identify your strengths and areas for
          improvement. We analyze your technique, consistency, and effectiveness across different aspects of the game.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Skill Level Image */}
          <div className="relative h-[250px] rounded-lg overflow-hidden">
            <Image
              src="/images/skill-level.jpeg"
              alt="Professional squash player demonstrating skill"
              fill
              className="object-contain"
            />
          </div>

          {/* Backhand Quality */}
          <Card>
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-base">Backhand Quality</CardTitle>
              <CardDescription className="text-xs">Technique and effectiveness rating</CardDescription>
            </CardHeader>
            <CardContent className="p-4 flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4 flex items-center justify-center">
                <div className="w-28 h-28 rounded-full border-4 border-green-500"></div>
                <span className="absolute text-3xl font-bold">83</span>
              </div>
              <div className="w-full space-y-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>Technique</span>
                  <span className="font-medium">85/100</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }}></div>
                </div>

                <div className="flex justify-between text-xs mb-1">
                  <span>Consistency</span>
                  <span className="font-medium">78/100</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "78%" }}></div>
                </div>

                <div className="flex justify-between text-xs mb-1">
                  <span>Power</span>
                  <span className="font-medium">80/100</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "80%" }}></div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground mt-4">
                <p>
                  <strong>Analysis:</strong> Your backhand has excellent technique but could benefit from more
                  consistency training, especially under pressure.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Forehand Quality */}
          <Card>
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-base">Forehand Quality</CardTitle>
              <CardDescription className="text-xs">Technique and effectiveness rating</CardDescription>
            </CardHeader>
            <CardContent className="p-4 flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4 flex items-center justify-center">
                <div className="w-28 h-28 rounded-full border-4 border-green-500"></div>
                <span className="absolute text-3xl font-bold">88</span>
              </div>
              <div className="w-full space-y-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>Technique</span>
                  <span className="font-medium">90/100</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "90%" }}></div>
                </div>

                <div className="flex justify-between text-xs mb-1">
                  <span>Consistency</span>
                  <span className="font-medium">85/100</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }}></div>
                </div>

                <div className="flex justify-between text-xs mb-1">
                  <span>Power</span>
                  <span className="font-medium">88/100</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "88%" }}></div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground mt-4">
                <p>
                  <strong>Analysis:</strong> Your forehand is your strongest weapon, with excellent technique, power,
                  and consistency. Continue to leverage this in your game.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skill Breakdown Radar Chart */}
        <Card>
          <CardHeader className="pb-2 p-4">
            <CardTitle className="text-base">Skill Breakdown</CardTitle>
            <CardDescription className="text-xs">Comprehensive evaluation of your key squash skills</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-48 relative">
                {/* Radar Chart Background */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-40 w-40">
                    {/* Background circles */}
                    <div className="absolute inset-[0%] border border-gray-200 rounded-full"></div>
                    <div className="absolute inset-[20%] border border-gray-200 rounded-full"></div>
                    <div className="absolute inset-[40%] border border-gray-200 rounded-full"></div>
                    <div className="absolute inset-[60%] border border-gray-200 rounded-full"></div>
                    <div className="absolute inset-[80%] border border-gray-200 rounded-full"></div>

                    {/* Axis lines */}
                    <div className="absolute top-[50%] left-0 right-0 h-[1px] bg-gray-200"></div>
                    <div className="absolute bottom-0 top-0 left-[50%] w-[1px] bg-gray-200"></div>
                    <div className="absolute top-0 left-0 right-0 bottom-0 transform rotate-45 origin-center">
                      <div className="absolute top-[50%] left-0 right-0 h-[1px] bg-gray-200"></div>
                    </div>
                    <div className="absolute top-0 left-0 right-0 bottom-0 transform -rotate-45 origin-center">
                      <div className="absolute top-[50%] left-0 right-0 h-[1px] bg-gray-200"></div>
                    </div>

                    {/* Skill labels */}
                    <div className="absolute top-[-5%] left-[50%] transform -translate-x-1/2 text-[8px] font-medium">
                      Technique
                    </div>
                    <div className="absolute bottom-[-5%] left-[50%] transform -translate-x-1/2 text-[8px] font-medium">
                      Fitness
                    </div>
                    <div className="absolute top-[50%] left-[-5%] transform -translate-y-1/2 text-[8px] font-medium">
                      Tactics
                    </div>
                    <div className="absolute top-[50%] right-[-5%] transform -translate-y-1/2 text-[8px] font-medium">
                      Mental
                    </div>
                    <div className="absolute top-[15%] right-[15%] transform rotate-45 text-[8px] font-medium">
                      Speed
                    </div>
                    <div className="absolute bottom-[15%] right-[15%] transform -rotate-45 text-[8px] font-medium">
                      Power
                    </div>
                    <div className="absolute bottom-[15%] left-[15%] transform rotate-45 text-[8px] font-medium">
                      Consistency
                    </div>
                    <div className="absolute top-[15%] left-[15%] transform -rotate-45 text-[8px] font-medium">
                      Deception
                    </div>

                    {/* Data polygon */}
                    <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                      <polygon
                        points="50,10 85,30 90,50 75,85 50,80 15,70 10,50 25,15"
                        fill="rgba(59, 130, 246, 0.2)"
                        stroke="#3b82f6"
                        strokeWidth="1.5"
                      />
                      {/* Interactive data points */}
                      {skillsData.map((skill, index) => (
                        <TooltipProvider key={`skill-point-${index}`}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <circle
                                cx={skill.position.x}
                                cy={skill.position.y}
                                r={selectedSkill === skill.name ? 2 : 1.5}
                                fill={selectedSkill === skill.name ? "#1d4ed8" : "#3b82f6"}
                                className="cursor-pointer transition-all duration-200"
                                onMouseEnter={() => setSelectedSkill(skill.name)}
                                onMouseLeave={() => setSelectedSkill(null)}
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-xs font-medium">
                                {skill.name}: {skill.value}/100
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </svg>
                  </div>
                </div>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {skillsData.map((skill, index) => (
                  <div
                    key={`skill-bar-${index}`}
                    className={`transition-all duration-200 ${selectedSkill === skill.name ? "bg-blue-50 dark:bg-blue-900/20 p-1 rounded-md -mx-1" : ""}`}
                    onMouseEnter={() => setSelectedSkill(skill.name)}
                    onMouseLeave={() => setSelectedSkill(null)}
                  >
                    <div className="flex justify-between text-xs mb-1">
                      <span>{skill.name}</span>
                      <span className="font-medium">{skill.value}/100</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${skill.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-4">
              <p>
                <strong>Analysis:</strong> Your strongest skills are Speed (88/100) and Technique (85/100). Your weakest
                areas are Deception (68/100) and Consistency (72/100), suggesting you should focus training on
                developing more varied shot selection and improving reliability under pressure.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 2. SHOT ANALYSIS SECTION */}
      <section className="mb-12" id="shot-analysis">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">2. Shot Analysis</h2>
          <Badge variant="outline" className="text-xs">
            Last 10 Matches
          </Badge>
        </div>

        <p className="text-muted-foreground mb-6 text-sm">
          Our AI technology analyzes every shot you play, categorizing them by type, measuring their speed and
          effectiveness, and comparing them to your opponents. This data helps you understand your shot selection
          patterns and identify which shots are most successful.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Shot Speed Card */}
          <Card>
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-base">Shot Speed</CardTitle>
              <CardDescription className="text-xs">Power measurement in km/h</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-32 h-32">
                  <Image
                    src="/images/shot-speed.jpeg"
                    alt="Squash racket"
                    fill
                    className="object-contain rounded-full"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Maximum Speed</span>
                    <span className="font-medium">{shotSpeedData.max} km/h</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: "100%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Average Speed</span>
                    <span className="font-medium">{shotSpeedData.average} km/h</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: "84%" }}></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-xs font-medium mb-1">Forehand</div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span>Drive</span>
                        <span>{shotSpeedData.forehand.drive} km/h</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "92%" }}></div>
                      </div>

                      <div className="flex justify-between text-[10px]">
                        <span>Volley</span>
                        <span>{shotSpeedData.forehand.volley} km/h</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "79%" }}></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-medium mb-1">Backhand</div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span>Drive</span>
                        <span>{shotSpeedData.backhand.drive} km/h</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "82%" }}></div>
                      </div>

                      <div className="flex justify-between text-[10px]">
                        <span>Volley</span>
                        <span>{shotSpeedData.backhand.volley} km/h</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "73%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-xs text-muted-foreground mt-4">
                <p>
                  <strong>Analysis:</strong> Your forehand drive generates the most power at 145 km/h, while your
                  backhand shots are slightly less powerful but still effective. Your maximum recorded shot speed of 158
                  km/h is impressive.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Shot Type Distribution */}
          <Card>
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-base">Shot Type Distribution</CardTitle>
              <CardDescription className="text-xs">Your shot selection vs opponent</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-medium text-center mb-2">You</div>
                  <div className="h-32 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative h-28 w-28">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          {shotTypeData.map((shot, index, array) => {
                            // Calculate start and end angles for pie segments
                            const total = array.reduce((sum, item) => sum + item.percentage, 0)
                            const startAngle =
                              index === 0
                                ? 0
                                : array.slice(0, index).reduce((sum, item) => sum + item.percentage, 0) * 3.6

                            const endAngle = startAngle + shot.percentage * 3.6

                            // Convert to radians for calculations
                            const startRad = ((startAngle - 90) * Math.PI) / 180
                            const endRad = ((endAngle - 90) * Math.PI) / 180

                            // Calculate path
                            const x1 = 50 + 50 * Math.cos(startRad)
                            const y1 = 50 + 50 * Math.sin(startRad)
                            const x2 = 50 + 50 * Math.cos(endRad)
                            const y2 = 50 + 50 * Math.sin(endRad)

                            // Determine if the arc is more than 180 degrees
                            const largeArcFlag = shot.percentage > 50 ? 1 : 0

                            return (
                              <TooltipProvider key={`pie-shot-${index}`}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <path
                                      d={`M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                                      fill={
                                        shot.color === "bg-blue-500"
                                          ? "#3b82f6"
                                          : shot.color === "bg-green-500"
                                            ? "#10b981"
                                            : shot.color === "bg-yellow-500"
                                              ? "#f59e0b"
                                              : shot.color === "bg-red-500"
                                                ? "#ef4444"
                                                : shot.color === "bg-purple-500"
                                                  ? "#8b5cf6"
                                                  : "#64748b"
                                      }
                                      stroke="white"
                                      strokeWidth="1"
                                      className="cursor-pointer hover:opacity-90 transition-all"
                                      onMouseEnter={() => setSelectedShotType(shot.type)}
                                      onMouseLeave={() => setSelectedShotType(null)}
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <div className="text-xs font-medium">
                                      {shot.type}: {shot.percentage}%
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )
                          })}
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 mt-2">
                    {shotTypeData.map((shot, index) => (
                      <div key={`shot-legend-${index}`} className="flex items-center gap-1">
                        <div className={`w-2 h-2 ${shot.color} rounded-full`}></div>
                        <span className="text-[8px]">
                          {shot.type} ({shot.percentage}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-medium text-center mb-2">Opponent</div>
                  <div className="h-32 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative h-28 w-28">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          {opponentShotTypeData.map((shot, index, array) => {
                            // Calculate start and end angles for pie segments
                            const total = array.reduce((sum, item) => sum + item.percentage, 0)
                            const startAngle =
                              index === 0
                                ? 0
                                : array.slice(0, index).reduce((sum, item) => sum + item.percentage, 0) * 3.6

                            const endAngle = startAngle + shot.percentage * 3.6

                            // Convert to radians for calculations
                            const startRad = ((startAngle - 90) * Math.PI) / 180
                            const endRad = ((endAngle - 90) * Math.PI) / 180

                            // Calculate path
                            const x1 = 50 + 50 * Math.cos(startRad)
                            const y1 = 50 + 50 * Math.sin(startRad)
                            const x2 = 50 + 50 * Math.cos(endRad)
                            const y2 = 50 + 50 * Math.sin(endRad)

                            // Determine if the arc is more than 180 degrees
                            const largeArcFlag = shot.percentage > 50 ? 1 : 0

                            return (
                              <TooltipProvider key={`pie-opp-shot-${index}`}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <path
                                      d={`M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                                      fill={
                                        shot.color === "bg-blue-500"
                                          ? "#3b82f6"
                                          : shot.color === "bg-green-500"
                                            ? "#10b981"
                                            : shot.color === "bg-yellow-500"
                                              ? "#f59e0b"
                                              : shot.color === "bg-red-500"
                                                ? "#ef4444"
                                                : shot.color === "bg-purple-500"
                                                  ? "#8b5cf6"
                                                  : "#64748b"
                                      }
                                      stroke="white"
                                      strokeWidth="1"
                                      className="cursor-pointer hover:opacity-90 transition-all opacity-60"
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <div className="text-xs font-medium">
                                      {shot.type}: {shot.percentage}%
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )
                          })}
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 mt-2">
                    {opponentShotTypeData.map((shot, index) => (
                      <div key={`opp-shot-legend-${index}`} className="flex items-center gap-1">
                        <div className={`w-2 h-2 ${shot.color} rounded-full opacity-60`}></div>
                        <span className="text-[8px]">
                          {shot.type} ({shot.percentage}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-xs text-muted-foreground mt-4">
                <p>
                  <strong>Analysis:</strong> You rely more on drives (42%) and volleys (28%) compared to your opponent
                  who uses more drops (22%) and boasts (15%). Consider incorporating more variety in your shot selection
                  to be less predictable.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Shot Effectiveness */}
          <Card>
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-base">Shot Effectiveness</CardTitle>
              <CardDescription className="text-xs">Success rates compared to opponent</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Forehand Drive</span>
                    <div className="flex gap-2">
                      <span className="font-medium text-blue-600">82%</span>
                      <span className="text-muted-foreground">vs</span>
                      <span className="font-medium text-red-600">75%</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "82%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Backhand Drive</span>
                    <div className="flex gap-2">
                      <span className="font-medium text-blue-600">64%</span>
                      <span className="text-muted-foreground">vs</span>
                      <span className="font-medium text-red-600">68%</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "64%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Forehand Volley</span>
                    <div className="flex gap-2">
                      <span className="font-medium text-blue-600">75%</span>
                      <span className="text-muted-foreground">vs</span>
                      <span className="font-medium text-red-600">70%</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Backhand Volley</span>
                    <div className="flex gap-2">
                      <span className="font-medium text-blue-600">52%</span>
                      <span className="text-muted-foreground">vs</span>
                      <span className="font-medium text-red-600">65%</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 rounded-full" style={{ width: "52%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Drop Shots</span>
                    <div className="flex gap-2">
                      <span className="font-medium text-blue-600">68%</span>
                      <span className="text-muted-foreground">vs</span>
                      <span className="font-medium text-red-600">72%</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "68%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Boasts</span>
                    <div className="flex gap-2">
                      <span className="font-medium text-blue-600">45%</span>
                      <span className="text-muted-foreground">vs</span>
                      <span className="font-medium text-red-600">60%</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                </div>
              </div>

              <div className="text-xs text-muted-foreground mt-4">
                <p>
                  <strong>Analysis:</strong> Your forehand shots outperform your opponent's, but your backhand volley
                  (52% vs 65%) and boasts (45% vs 60%) are significantly weaker. These should be priority areas for
                  improvement.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 3. MOVEMENT ANALYSIS SECTION */}
      <section className="mb-12" id="movement-analysis">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">3. Movement Analysis</h2>
          <Badge variant="outline" className="text-xs">
            Last Match
          </Badge>
        </div>

        <p className="text-muted-foreground mb-6 text-sm">
          Movement efficiency is crucial in squash. Our analysis tracks your recovery time, total distance covered, T
          position control, and speed throughout each game to help you optimize your court movement and positioning.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Player Speed Image */}
          <div className="relative h-[250px] rounded-lg overflow-hidden">
            <Image
              src="/images/player-speed.jpeg"
              alt="Professional squash player demonstrating speed"
              fill
              className="object-contain"
            />
          </div>

          {/* Recovery Time & Total Distance */}
          <Card>
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-base">Recovery Metrics</CardTitle>
              <CardDescription className="text-xs">Recovery time and distance covered</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col items-center justify-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Timer className="h-6 w-6 text-blue-600 dark:text-blue-400 mb-1" />
                  <div className="text-xs font-medium">Recovery Time</div>
                  <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    {movementData.recoveryTime.you}s
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    vs {movementData.recoveryTime.opponent}s (opponent)
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <Footprints className="h-6 w-6 text-green-600 dark:text-green-400 mb-1" />
                  <div className="text-xs font-medium">Total Distance</div>
                  <div className="text-xl font-bold text-green-600 dark:text-green-400">
                    {movementData.totalDistance.you}km
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    vs {movementData.totalDistance.opponent}km (opponent)
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Recovery Efficiency</span>
                    <span className="font-medium text-blue-600">85%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Movement Efficiency</span>
                    <span className="font-medium text-green-600">78%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: "78%" }}></div>
                  </div>
                </div>
              </div>

              <div className="text-xs text-muted-foreground mt-4">
                <p>
                  <strong>Analysis:</strong> Your recovery time (1.8s) is significantly better than your opponent's
                  (2.1s), giving you an advantage in rallies. You also cover less distance (2.4km vs 2.7km), indicating
                  more efficient movement.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* T Position Control */}
          <Card>
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-base">T Position Control</CardTitle>
              <CardDescription className="text-xs">Control of the center court</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-32 relative">
                {/* X and Y axes */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-300"></div>
                <div className="absolute bottom-0 left-0 w-0.5 h-full bg-gray-300"></div>

                {/* X-axis labels */}
                {tControlData.map((item, index) => (
                  <div
                    key={`t-control-x-${index}`}
                    className="absolute bottom-[-12px] transform -translate-x-1/2 text-[8px] text-gray-500"
                    style={{ left: `${(index / (tControlData.length - 1)) * 100}%` }}
                  >
                    G{index + 1}
                  </div>
                ))}

                {/* Y-axis labels */}
                <div className="absolute top-0 left-[-15px] text-[8px] text-gray-500">100%</div>
                <div className="absolute top-[50%] left-[-15px] text-[8px] text-gray-500">50%</div>
                <div className="absolute bottom-0 left-[-15px] text-[8px] text-gray-500">0%</div>

                {/* Grid lines */}
                <div className="absolute top-[50%] left-0 w-full h-0.5 bg-gray-100"></div>

                {/* Line graph - You */}
                <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                  {/* Line */}
                  <polyline
                    points={tControlData
                      .map((item, index) => `${(index / (tControlData.length - 1)) * 100}%,${100 - item.you}%`)
                      .join(" ")}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Line graph - Opponent */}
                <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                  {/* Line */}
                  <polyline
                    points={tControlData
                      .map((item, index) => `${(index / (tControlData.length - 1)) * 100}%,${100 - item.opponent}%`)
                      .join(" ")}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {/* Data points - You */}
                {tControlData.map((item, index) => (
                  <TooltipProvider key={`t-position-point-you-${index}`}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className="absolute h-2 w-2 rounded-full bg-blue-500 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                          style={{
                            top: `${100 - item.you}%`,
                            left: `${(index / (tControlData.length - 1)) * 100}%`,
                          }}
                        ></div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-xs font-medium">Your T Control: {item.you}%</div>
                        <div className="text-xs text-muted-foreground">Game {index + 1}</div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}

                {/* Data points - Opponent */}
                {tControlData.map((item, index) => (
                  <TooltipProvider key={`t-position-point-opp-${index}`}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className="absolute h-2 w-2 rounded-full bg-red-500 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                          style={{
                            top: `${100 - item.opponent}%`,
                            left: `${(index / (tControlData.length - 1)) * 100}%`,
                          }}
                        ></div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-xs font-medium">Opponent T Control: {item.opponent}%</div>
                        <div className="text-xs text-muted-foreground">Game {index + 1}</div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}

                {/* Legend */}
                <div className="absolute top-1 right-1 bg-white/80 dark:bg-gray-800/80 p-1 rounded text-[8px] flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span>You</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                    <span>Opponent</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-muted-foreground mt-4">
                <p>
                  <strong>Analysis:</strong> Your T position control has been steadily improving, reaching 85% in Game
                  6. This is significantly better than your opponent, giving you a strategic advantage in controlling
                  rallies.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Average Speed Throughout Games */}
        <Card>
          <CardHeader className="pb-2 p-4">
            <CardTitle className="text-base">Average Speed Throughout Games</CardTitle>
            <CardDescription className="text-xs">Speed measurement in meters per second</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-40 relative">
              {/* X and Y axes */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-300"></div>
              <div className="absolute bottom-0 left-0 w-0.5 h-full bg-gray-300"></div>

              {/* X-axis labels */}
              {movementData.averageSpeed.map((item, index) => (
                <div
                  key={`speed-x-${index}`}
                  className="absolute bottom-[-12px] transform -translate-x-1/2 text-[8px] text-gray-500"
                  style={{ left: `${(index / (movementData.averageSpeed.length - 1)) * 100}%` }}
                >
                  Game {index + 1}
                </div>
              ))}

              {/* Y-axis labels */}
              <div className="absolute top-0 left-[-15px] text-[8px] text-gray-500">2.5 m/s</div>
              <div className="absolute top-[50%] left-[-15px] text-[8px] text-gray-500">1.5 m/s</div>
              <div className="absolute bottom-0 left-[-15px] text-[8px] text-gray-500">0 m/s</div>

              {/* Grid lines */}
              <div className="absolute top-[50%] left-0 w-full h-0.5 bg-gray-100"></div>

              {/* Line graph - You */}
              <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                {/* Line */}
                <polyline
                  points={movementData.averageSpeed
                    .map(
                      (item, index) =>
                        `${(index / (movementData.averageSpeed.length - 1)) * 100}%,${100 - (item.you / 2.5) * 100}%`,
                    )
                    .join(" ")}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Line graph - Opponent */}
              <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                {/* Line */}
                <polyline
                  points={movementData.averageSpeed
                    .map(
                      (item, index) =>
                        `${(index / (movementData.averageSpeed.length - 1)) * 100}%,${100 - (item.opponent / 2.5) * 100}%`,
                    )
                    .join(" ")}
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Data points - You */}
              {movementData.averageSpeed.map((item, index) => (
                <TooltipProvider key={`speed-point-you-${index}`}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className="absolute h-2 w-2 rounded-full bg-blue-500 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                        style={{
                          top: `${100 - (item.you / 2.5) * 100}%`,
                          left: `${(index / (movementData.averageSpeed.length - 1)) * 100}%`,
                        }}
                      ></div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-xs font-medium">Your Speed: {item.you} m/s</div>
                      <div className="text-xs text-muted-foreground">Game {index + 1}</div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}

              {/* Data points - Opponent */}
              {movementData.averageSpeed.map((item, index) => (
                <TooltipProvider key={`speed-point-opp-${index}`}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className="absolute h-2 w-2 rounded-full bg-red-500 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                        style={{
                          top: `${100 - (item.opponent / 2.5) * 100}%`,
                          left: `${(index / (movementData.averageSpeed.length - 1)) * 100}%`,
                        }}
                      ></div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-xs font-medium">Opponent Speed: {item.opponent} m/s</div>
                      <div className="text-xs text-muted-foreground">Game {index + 1}</div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}

              {/* Legend */}
              <div className="absolute top-1 right-1 bg-white/80 dark:bg-gray-800/80 p-1 rounded text-[8px] flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>You</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  <span>Opponent</span>
                </div>
              </div>
            </div>

            <div className="text-xs text-muted-foreground mt-4">
              <p>
                <strong>Analysis:</strong> Your average speed is consistently higher than your opponent's except in Game
                3, where there was a slight dip. This correlates with your performance drop in that game. Your speed
                advantage in Games 2 and 4 contributed significantly to your success in those games.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 4. RALLY ANALYSIS SECTION */}
      <section className="mb-12" id="rally-analysis">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">4. Rally Analysis</h2>
          <Badge variant="outline" className="text-xs">
            Last 10 Matches
          </Badge>
        </div>

        <p className="text-muted-foreground mb-6 text-sm">
          Understanding rally patterns helps optimize your strategy and endurance. Our analysis breaks down rally
          lengths, success rates at different stages, and your performance in critical points that often determine match
          outcomes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Rally Length Distribution */}
          <Card>
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-base">Rally Length Distribution</CardTitle>
              <CardDescription className="text-xs">Performance in rallies of different lengths</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-32 flex items-end gap-1 mt-2">
                {rallyLengthData.map((rally, index) => (
                  <TooltipProvider key={`rally-length-${index}`}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex-1 flex flex-col items-center cursor-pointer group">
                          <div
                            className={`w-full ${rally.color} rounded-t-sm transition-all duration-300 group-hover:opacity-90 group-hover:shadow-md`}
                            style={{ height: rally.height }}
                          ></div>
                          <span className="text-[8px] mt-1 font-medium">{rally.range}</span>
                          <span className="text-[8px] text-muted-foreground">{rally.percentage}%</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-xs font-medium">
                          Rally Length {rally.range} shots: {rally.percentage}%
                        </div>
                        <div className="text-xs text-muted-foreground">Win rate: {75 - Math.abs(index - 2) * 10}%</div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-lg border p-2">
                  <div className="text-xs font-medium mb-1">Conversion Rate by Length</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span>Short (1-5)</span>
                      <span className="font-medium">55%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500 rounded-full" style={{ width: "55%" }}></div>
                    </div>

                    <div className="flex justify-between text-[10px]">
                      <span>Medium (6-15)</span>
                      <span className="font-medium">75%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "75%" }}></div>
                    </div>

                    <div className="flex justify-between text-[10px]">
                      <span>Long (16+)</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-2">
                  <div className="text-xs font-medium mb-1">Rally Outcomes</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span>Winners</span>
                      <span className="font-medium">32%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "32%" }}></div>
                    </div>

                    <div className="flex justify-between text-[10px]">
                      <span>Forced Errors</span>
                      <span className="font-medium">28%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "28%" }}></div>
                    </div>

                    <div className="flex justify-between text-[10px]">
                      <span>Unforced Errors</span>
                      <span className="font-medium">40%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: "40%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-xs text-muted-foreground mt-4">
                <p>
                  <strong>Analysis:</strong> Most of your rallies (40%) fall in the 11-15 shot range, where you also
                  have your highest win rate (75%). Your performance drops in very short rallies (1-5 shots) and very
                  long rallies (21+ shots), suggesting you should avoid quick exchanges and work on endurance for
                  extended rallies.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Critical Points Analysis */}
          <Card>
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-base">Critical Points Analysis</CardTitle>
              <CardDescription className="text-xs">Performance during match-defining moments</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="mb-4">
                <div className="space-y-1">
                  {criticalPointsData.byGame.map((game, index) => (
                    <TooltipProvider key={`critical-stat-${index}`}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="cursor-pointer hover:bg-muted/20 p-1 rounded transition-all">
                            <div className="flex justify-between text-[8px] mb-1">
                              <span>Game {index + 1}</span>
                              <span className="font-medium">{game.success}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${game.success > 60 ? "bg-green-500" : game.success > 50 ? "bg-blue-500" : "bg-red-500"}`}
                                style={{ width: `${game.success}%` }}
                              ></div>
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="text-xs font-medium">
                            Game {index + 1}: {game.success}% success rate
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Won {game.won} of {game.total} critical points
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>

              <div className="w-full overflow-x-auto">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px] text-[10px]">Game</TableHead>
                      <TableHead className="text-[10px]">Score</TableHead>
                      <TableHead className="text-[10px]">Outcome</TableHead>
                      <TableHead className="text-[10px]">Shot Type</TableHead>
                      <TableHead className="text-[10px]">Position</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {criticalPointsTableData.slice(0, 5).map((point, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-[10px]">{point.game}</TableCell>
                        <TableCell className="text-[10px] font-medium">{point.score}</TableCell>
                        <TableCell className="text-[10px]">
                          <span
                            className={
                              point.outcome === "Winner"
                                ? "text-green-600 font-medium"
                                : point.outcome === "Forced Error"
                                  ? "text-blue-600 font-medium"
                                  : point.outcome === "Unforced Error"
                                    ? "text-red-600 font-medium"
                                    : "text-amber-600 font-medium"
                            }
                          >
                            {point.outcome}
                          </span>
                        </TableCell>
                        <TableCell className="text-[10px]">{point.shotType}</TableCell>
                        <TableCell className="text-[10px]">{point.position}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="text-xs text-muted-foreground mt-4">
                <p>
                  <strong>Analysis:</strong> In critical points, you win 42% with direct winners and force errors 28% of
                  the time, showing good offensive capability. Your performance varies significantly between games, with
                  a concerning dip in Game 3 (42% success). Mental training to maintain focus throughout the match could
                  help stabilize your performance in these crucial moments.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold mb-2">Ready to improve your game?</h3>
                <p className="text-xs text-muted-foreground">
                  Upload your match videos and get detailed insights to take your squash to the next level.
                </p>
              </div>
              <div className="flex gap-3">
                <Button asChild size="sm">
                  <Link href="/memberships">Get Started</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export default CoreInsightsPage;
