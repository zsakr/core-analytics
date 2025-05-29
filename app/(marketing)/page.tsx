"use client";

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from 'react'
import {
  BarChart2,
  Upload,
  Zap,
  TrendingUp,
  Activity,
  Target,
  Award,
  Star,
  Quote,
  MessageSquare,
  FileText,
  LineChart,
  Sparkles,
  Check,
  Users,
  Trophy,
  Command,
  Brain,
  Share2,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import CountdownTimer from "@/components/countdown-timer"

function HomePage() {

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <Image
            src="/images/squash-action-hero.jpeg"
            alt="Professional squash player in action"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container px-4 md:px-6 relative z-20">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
              Beyond Highlights. Into the Why.
              </h1>
              <p className="max-w-[600px] mx-auto text-white md:text-xl font-medium">Upload once. Core reveals the patterns, pressure, and moments that matter</p>
            </div>
            <div className="mt-8">
              <Button asChild size="xl" variant="secondary" className="font-medium mr-4">
                <Link href="/memberships">See It In Action</Link>
              </Button>
              <Button 
                asChild 
                size="xl" 
                variant="outline" 
                className="font-medium border-white text-white hover:bg-white/10 dark:border-primary dark:text-primary dark:hover:bg-primary/10"
              >
                <Link href="/core-insights">Learn More</Link>
              </Button>
              <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
                <div className="space-y-4 text-center">
                  <h3 className="text-2xl font-bold text-white">Early Access</h3>
                  <p className="text-lg text-blue-100">Limited beta spots available</p>
                  <Button asChild size="xl" variant="secondary" className="font-medium mr-4">
                    <Link href="/memberships">Sign Up Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">How Core Insights Works</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Your complete squash analytics platform. Every match. Every insight. One place.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 -z-10"></div>
              <div className="p-8 relative flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center transform group-hover:-translate-y-1 transition-transform duration-300">
                  <Upload className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-semibold">1. Upload Match</h3>
                <p className="text-gray-600 dark:text-gray-400">Upload any match video to our secure platform. Build your match history in one centralized location.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 -z-10"></div>
              <div className="p-8 relative flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center transform group-hover:-translate-y-1 transition-transform duration-300">
                  <Brain className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-semibold">2. AI Analysis</h3>
                <p className="text-gray-600 dark:text-gray-400">Our AI analyzes each match in detail while tracking patterns across all your games.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 -z-10"></div>
              <div className="p-8 relative flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center transform group-hover:-translate-y-1 transition-transform duration-300">
                  <LineChart className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-semibold">3. Get Insights</h3>
                <p className="text-gray-600 dark:text-gray-400">Access match-specific analysis and track your progress over time with comprehensive trend analysis.</p>
              </div>
            </div>
          </div>

          {/* Analysis Features */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-blue-600" />
                  Single Match Analysis
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    Detailed shot-by-shot breakdown
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    Movement and positioning heatmaps
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    Key moments and pressure points
                  </li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  Long-term Progress Tracking
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    Performance trends across matches
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    Pattern recognition and habits
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    Improvement recommendations
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Benefits Section */}
      <section className="w-full py-12 md:py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-white dark:to-white py-2">
            Court to Clarity
            </h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-600 dark:text-gray-300">
            Pro-level insights for players and coaches
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-8">
            {/* For Players Section */}
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center rounded-full bg-blue-500/10 px-4 py-1 mb-4">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">For Players</span>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-blue-500 transition-all">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">AI Performance Coach</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your personal AI coach analyzes every shot, providing instant feedback on technique, positioning, and strategy. Get personalized training plans and drills based on your unique playing style.
                  </p>
                </div>

                <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-blue-500 transition-all">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Match Mastery</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Gain unprecedented insights into your game with advanced shot analysis, movement heatmaps, and tactical patterns. Study opponent tendencies and develop winning strategies for every match.
                  </p>
                </div>
              </div>
            </div>

            {/* For Coaches Section */}
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center rounded-full bg-purple-500/10 px-4 py-1 mb-4">
                  <span className="text-sm font-medium text-purple-600 dark:text-purple-400">For Coaches</span>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-purple-500 transition-all">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4">
                    <BarChart2 className="h-6 w-6 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Elite Coaching Suite</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Transform your coaching with data-driven insights. Track multiple players, identify patterns across matches, and create customized training programs. Our AI helps you spot technical details that even experienced eyes might miss.
                  </p>
                </div>

                <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-purple-500 transition-all">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4">
                    <Activity className="h-6 w-6 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Player Development Hub</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Monitor player progress with detailed analytics dashboards. Set goals, track improvements, and make data-backed decisions for player development. Perfect for academies and professional coaches managing multiple athletes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl p-6 max-w-6xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-4 text-center">
              <Target className="h-6 w-6 text-blue-500" />
              <p className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                The only platform that combines AI analysis, performance tracking, and tactical insights in one comprehensive solution
              </p>
            </div>
          </div>

          {/* Core Features Section */}
          <div className="mt-24 mb-16">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Core Platform
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Three powerful tools working seamlessly together to revolutionize your squash experience
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Core Academy */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-gray-200 dark:border-gray-800 group-hover:border-blue-500 transition-all">
                  <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                    <Command className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">Core Academy</h3>
                  <p className="text-gray-600 dark:text-gray-400 group-hover:text-blue-50 transition-colors mb-6">
                    Connect with elite squash coaches from the Core team for personalized, one-on-one coaching sessions. Get expert guidance tailored to your game.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400 group-hover:text-blue-50">
                      <CheckCircle2 className="h-5 w-5 text-blue-500 group-hover:text-white" />
                      <span>1-on-1 coaching sessions</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400 group-hover:text-blue-50">
                      <CheckCircle2 className="h-5 w-5 text-blue-500 group-hover:text-white" />
                      <span>Personalized training plans</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400 group-hover:text-blue-50">
                      <CheckCircle2 className="h-5 w-5 text-blue-500 group-hover:text-white" />
                      <span>Expert technique analysis</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Core Insights */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-gray-200 dark:border-gray-800 group-hover:border-purple-500 transition-all">
                  <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
                    <Brain className="h-8 w-8 text-purple-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">Core Insights</h3>
                  <p className="text-gray-600 dark:text-gray-400 group-hover:text-purple-50 transition-colors mb-6">
                    Our revolutionary AI watches and analyzes your matches like a world-class coach, providing instant, detailed feedback that would take hours to compile manually.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400 group-hover:text-purple-50">
                      <CheckCircle2 className="h-5 w-5 text-purple-500 group-hover:text-white" />
                      <span>AI-powered match analysis</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400 group-hover:text-purple-50">
                      <CheckCircle2 className="h-5 w-5 text-purple-500 group-hover:text-white" />
                      <span>Advanced shot detection</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400 group-hover:text-purple-50">
                      <CheckCircle2 className="h-5 w-5 text-purple-500 group-hover:text-white" />
                      <span>Real-time improvement tips</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Core Connect */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-gray-200 dark:border-gray-800 group-hover:border-cyan-500 transition-all">
                  <div className="w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6">
                    <Share2 className="h-8 w-8 text-cyan-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">Core Connect</h3>
                  <p className="text-gray-600 dark:text-gray-400 group-hover:text-cyan-50 transition-colors mb-6">
                    Never miss a game again! Find and connect with squash players in your area, schedule matches, and build your squash network. Perfect for travelers and locals looking for new playing partners.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400 group-hover:text-cyan-50">
                      <CheckCircle2 className="h-5 w-5 text-cyan-500 group-hover:text-white" />
                      <span>Local player matching</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400 group-hover:text-cyan-50">
                      <CheckCircle2 className="h-5 w-5 text-cyan-500 group-hover:text-white" />
                      <span>Skill-based matchmaking</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400 group-hover:text-cyan-50">
                      <CheckCircle2 className="h-5 w-5 text-cyan-500 group-hover:text-white" />
                      <span>Court booking integration</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Overview Stats */}
      <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-8">Key Performance Metrics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-2">
                  <Award className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  <CardTitle className="text-xl">Win Rate</CardTitle>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">68%</p>
                  <p className="text-sm text-muted-foreground">+5% from last month</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-2">
                  <Target className="h-8 w-8 text-green-600 dark:text-green-400" />
                  <CardTitle className="text-xl">Shot Accuracy</CardTitle>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">78%</p>
                  <p className="text-sm text-muted-foreground">+3% from last month</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-2">
                  <Activity className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  <CardTitle className="text-xl">Rally Length</CardTitle>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">12</p>
                  <p className="text-sm text-muted-foreground">Avg. shots per rally</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-amber-200 dark:border-amber-800">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-2">
                  <TrendingUp className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                  <CardTitle className="text-xl">T Position</CardTitle>
                  <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">65%</p>
                  <p className="text-sm text-muted-foreground">Control rate</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-2">
                  <Target className="h-8 w-8 text-red-600 dark:text-red-400" />
                  <CardTitle className="text-xl">Critical Points</CardTitle>
                  <p className="text-3xl font-bold text-red-600 dark:text-red-400">72%</p>
                  <p className="text-sm text-muted-foreground">Conversion rate</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-950 dark:to-cyan-900 border-cyan-200 dark:border-cyan-800">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-2">
                  <Activity className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
                  <CardTitle className="text-xl">Movement</CardTitle>
                  <p className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">2.4km</p>
                  <p className="text-sm text-muted-foreground">Avg. per match</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900 border-indigo-200 dark:border-indigo-800">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-2">
                  <BarChart2 className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                  <CardTitle className="text-xl">Shot Types</CardTitle>
                  <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">5+</p>
                  <p className="text-sm text-muted-foreground">Distribution analysis</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-2">
                  <TrendingUp className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                  <CardTitle className="text-xl">Rally Win Rate</CardTitle>
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">75%</p>
                  <p className="text-sm text-muted-foreground">Medium-length rallies</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-electric-gradient text-foreground dark:text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground dark:text-white">Core Features</h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-foreground/80 dark:text-white/80">Powerful tools to elevate your squash performance</p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
            <div className="flex flex-col items-center space-y-2 rounded-lg border border-primary/20 dark:border-white/20 p-6 bg-white/5 dark:bg-white/5 backdrop-blur-sm">
              <div className="rounded-full bg-primary/10 dark:bg-white/10 p-3">
                <Zap className="h-6 w-6 text-primary dark:text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground dark:text-white">Shot Analysis</h3>
              <p className="text-center text-foreground/80 dark:text-white/80">
                Detailed breakdown of shot type, speed, and placement on the court and front wall.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border border-primary/20 dark:border-white/20 p-6 bg-white/5 dark:bg-white/5 backdrop-blur-sm">
              <div className="rounded-full bg-primary/10 dark:bg-white/10 p-3">
                <BarChart2 className="h-6 w-6 text-primary dark:text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground dark:text-white">Performance Metrics</h3>
              <p className="text-center text-foreground/80 dark:text-white/80">
                Track winners, errors, and rally statistics to identify patterns and areas for improvement.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border border-primary/20 dark:border-white/20 p-6 bg-white/5 dark:bg-white/5 backdrop-blur-sm">
              <div className="rounded-full bg-primary/10 dark:bg-white/10 p-3">
                <Upload className="h-6 w-6 text-primary dark:text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground dark:text-white">Easy Video Upload</h3>
              <p className="text-center text-foreground/80 dark:text-white/80">
                Simply upload your match videos and receive comprehensive analysis within minutes.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border border-primary/20 dark:border-white/20 p-6 bg-white/5 dark:bg-white/5 backdrop-blur-sm">
              <div className="rounded-full bg-primary/10 dark:bg-white/10 p-3">
                <MessageSquare className="h-6 w-6 text-primary dark:text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground dark:text-white">AI Coach Chat</h3>
              <p className="text-center text-foreground/80 dark:text-white/80">
                Get real-time advice and answers to your questions from our AI coaching assistant.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border border-primary/20 dark:border-white/20 p-6 bg-white/5 dark:bg-white/5 backdrop-blur-sm">
              <div className="rounded-full bg-primary/10 dark:bg-white/10 p-3">
                <LineChart className="h-6 w-6 text-primary dark:text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground dark:text-white">Progress Tracking</h3>
              <p className="text-center text-foreground/80 dark:text-white/80">
                Monitor your improvement over time with detailed performance metrics and progress charts.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border border-primary/20 dark:border-white/20 p-6 bg-white/5 dark:bg-white/5 backdrop-blur-sm">
              <div className="rounded-full bg-primary/10 dark:bg-white/10 p-3">
                <Share2 className="h-6 w-6 text-primary dark:text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground dark:text-white">Share & Compare</h3>
              <p className="text-center text-foreground/80 dark:text-white/80">
                Share your progress with coaches and compare your stats with other players in your level.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Trusted by World Champions
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                See what professional squash players are saying about Core Analytics
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Nouran Gohar Testimonial */}
            <Card className="relative overflow-hidden">
              <div className="absolute top-4 left-4">
                <Quote className="h-8 w-8 text-primary/20" />
              </div>
              <CardContent className="pt-12 pb-8 px-6">
                <p className="mb-6 italic">
                  "I think it's super important to have such a tool in our sport to not only enhance every player's
                  performance but also to make the audience understand the game of squash more and get more in-depth
                  with the tactics and skills of the players."
                </p>
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src="/images/nouran-gohar.jpeg" alt="Nouran Gohar" />
                    <AvatarFallback>NG</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Nouran Gohar</p>
                    <p className="text-sm text-muted-foreground">World #1 & World Champion</p>
                  </div>
                </div>
                <div className="absolute bottom-6 right-6 flex">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </div>
              </CardContent>
            </Card>

            {/* Tarek Momen Testimonial */}
            <Card className="relative overflow-hidden">
              <div className="absolute top-4 left-4">
                <Quote className="h-8 w-8 text-primary/20" />
              </div>
              <CardContent className="pt-12 pb-8 px-6">
                <p className="mb-6 italic">
                  "I believe it is going to be a game changer, there so much you can do with it, not only the players
                  can use the data in order to optimize their performance, and work on improving areas of weakness, it
                  can also add to the fan experience with all the cool insights and stats that can be broadcasted live
                  on TV in between sets, or before and after matches"
                </p>
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src="/images/tarek-momen.jpeg" alt="Tarek Momen" />
                    <AvatarFallback>TM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Tarek Momen</p>
                    <p className="text-sm text-muted-foreground">World Champion</p>
                  </div>
                </div>
                <div className="absolute bottom-6 right-6 flex">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center justify-center rounded-full bg-muted p-1 mb-4">
              <div className="rounded-full bg-background px-3 py-1 text-sm font-medium">
                Join 10,000+ players and coaches
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-6">Ready to elevate your squash game?</h3>
            <Button size="lg" asChild>
              <Link href="/memberships">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Transform Your Squash Game?
              </h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of players and coaches who are elevating their game with Core Analytics.
              </p>
            </div>
            <div className="mt-6">
              <Button
                asChild
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 font-medium shadow-lg rounded-xl"
              >
                <Link href="/memberships">Join Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage;
