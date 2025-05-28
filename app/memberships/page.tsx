"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, CheckCircle, Upload, Sparkles, Zap, BarChart2, Trophy, ArrowRight, Calendar, BarChart, Users, LineChart, Brain, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import CountdownTimer from "@/components/countdown-timer"

export default function MembershipsPage() {
  const [isYearly, setIsYearly] = useState(false)

  // Update the individual plans data to include the number of uploads
  const creditPacks = [
    {
      title: "Basic Pack",
      credits: 3,
      price: 15,
    },
    {
      title: "Standard Pack",
      credits: 6,
      price: 30,
    },
    {
      title: "Pro Pack",
      credits: 10,
      price: 50,
    },
  ];

  const individualPlans = [
    {
      title: "Core Beta",
      description: "Join the beta and get access to the core features",
      monthlyPrice: 14.99,
      monthlyCredits: 3,
      features: [
        "Core Features:",
        "• 6 uploads per month",
        "• Basic match analysis with shot detection",
        "• Shot pattern recognition",
        "• Performance metrics",
        "• Core Dashboard",
        "• AI-powered coaching insights",
        "",
        "Beta Exclusive:",
        "• Early access to new features",
        "• Priority support",
        "• Community feedback influence",
      ],
      popular: false,
    },
    /**
    {
      title: "Performance",
      description: "Best for players ready to level up with coaching and networking",
      monthlyPrice: 89.99,
      monthlyCredits: 10,
      creditValue: 15,
      features: [
        "Core Features:",
        "• 10 uploads per month",
        "• Advanced match analysis",
        "• Shot pattern recognition",
        "• Performance metrics",
        "• Core Connect",
        "• Track your progress with Core Dashboard",
        "• AI Squash Coach Chat: 10 Credits included. Each response is equivalent to 1-credit",
        "• Core Academy: 1 Free Session to Connect with a Professional",
        "",
        "Additional Credits & Value Included:",
        "• 3 Monthly Credits ($15 value)",
        "• Use credits for:",
        "  - Extra Uploads",
        "  - Core Academy: Connect with a Professional",
        "  - AI Squash Coach Chat",
      ],
      popular: true,
    },
    {
      title: "Pro",
      description: "For elite players and coaches with full flexibility",
      monthlyPrice: 139.99,
      monthlyCredits: 20,
      creditValue: 30,
      features: [
        "Core Features:",
        "• 25 uploads per month",
        "• Advanced match analysis",
        "• Shot pattern recognition",
        "• Performance metrics",
        "• Core Connect",
        "• Track your progress with Core Dashboard",
        "• AI Squash Coach Chat: 50 Credits Included. Each response is equivalent to 1-credit",
        "• Core Academy: 2 free sessions to get 1-on-1 online coaching session with a Core Professional",
        "",
        "Additional Credits & Value Included:",
        "• 6 monthly credits ($30 value)",
        "• Use freely across:",
        "  - Premium coaching",
        "  - Extra Uploads",
        "  - Core Academy: Connect with a Professional",
        "  - AI Squash Coach Chat",
      ],
      popular: false,
    },
     */
  ]



  // Calculate yearly price (11 months for the price of 12)
  const getYearlyPrice = (monthlyPrice: number) => {
    return (monthlyPrice * 11).toFixed(2)
  }

  // Calculate discounted price (40% off)
  const getDiscountedPrice = (price: number) => {
    return (price * 0.6).toFixed(2) // 40% off
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      {/* Early Access Banner */}
      <div className="mb-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center rounded-full bg-indigo-500/20 px-4 py-1 mb-4">
              <span className="text-sm font-medium text-indigo-200">Limited Time Offer</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Join Core's Beta Access Program
            </h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-6">
              Lock in special Beta member pricing - up to 30% off first year
            </p>
            <div className="flex flex-col items-center justify-center space-y-6">
              {/* 
              <div className="text-center">
                <p className="text-indigo-200 mb-2">Beta Access Offer Ends In:</p>
                <div className="text-2xl font-bold text-white">
                  <CountdownTimer targetDate={new Date("2025-06-15T23:59:59")} />
                </div>
                
              </div>
              */}
              <Button 
                size="lg" 
                className="bg-white text-indigo-600 hover:bg-indigo-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
                asChild
              >
                <Link href="/auth/sign-up?plan=early-access" target="_blank">
                  Sign Up Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>
      

      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Membership Plans</h1>
          <p className="text-muted-foreground">
            Choose the perfect plan to elevate your squash game with advanced analytics
          </p>
        </div>
      </div>

      {/* Launch Discount Banner */}
      {/*
      <div className="mt-6 mb-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 text-center">
        <Badge className="bg-amber-500 mb-2">Limited Time Offer</Badge>
        <h3 className="text-lg font-medium mb-1">Launch Discount Now Available!</h3>
        <p className="text-sm text-muted-foreground">
          All packages are currently offered at special introductory pricing. Lock in these rates before they increase!
        </p>
      </div>
      */}
      {/* Billing Toggle */}

      {/*
      <div className="flex flex-col items-center justify-center mt-8 mb-10">
        <div className="flex items-center space-x-4 bg-muted p-2 rounded-lg">
          <div className={`px-4 py-2 rounded ${!isYearly ? "bg-primary text-primary-foreground" : ""}`}>Monthly</div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              id="billing-toggle"
              aria-label="Toggle billing period"
            />
            <Label htmlFor="billing-toggle" className="sr-only">
              Toggle billing period
            </Label>
          </div>
          <div
            className={`px-4 py-2 rounded flex items-center gap-2 ${isYearly ? "bg-primary text-primary-foreground" : ""}`}
          >
            Yearly
            <Badge className="bg-green-500 text-xs">1 Month Free</Badge>
          </div>
        </div>
      </div>
      */}
      {/* Individual Plans */}
      <div className="grid gap-4 mt-8 md:grid-cols-3 max-w-5xl mx-auto">
        {individualPlans.map((plan, index) => (
          <Card 
            key={index} 
            className={`
              flex flex-col relative transform transition-all duration-300 hover:scale-105
              ${plan.popular ? 'ring-2 ring-primary shadow-lg scale-105' : 'ring-1 ring-white/10'}
              hover:shadow-xl hover:shadow-primary/20
            `}
          >
            <CardHeader className="p-4">
              {plan.popular && (
                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-0.5 text-xs font-semibold text-black shadow-lg">
                    <Sparkles className="h-3 w-3" />
                    Most Popular
                  </span>
                </div>
              )}
              <CardTitle className="text-xl mb-1">{plan.title}</CardTitle>
              <CardDescription className="min-h-[40px] text-sm">{plan.description}</CardDescription>
              <div className="mt-3 space-y-1">
                <div className="mt-4">
                  <span className="text-2xl font-bold text-green-500">${plan.monthlyPrice}</span>
                  <span className="text-sm text-muted-foreground">/month</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 p-4 pt-2">
              <div className="my-3 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
              <ul className="space-y-2.5 text-xs">
                {plan.features.map((feature, featureIndex) => {
                  if (feature === "") return <div key={featureIndex} className="h-2" />;
                  if (feature.endsWith(":")) {
                    return (
                      <li key={featureIndex} className="font-semibold text-primary pt-1">
                        {feature}
                      </li>
                    );
                  }
                  return (
                    <li key={featureIndex} className="flex items-start gap-x-2">
                      <Check className="h-4 w-4 flex-none text-primary mt-0.5" />
                      <span className="text-muted-foreground leading-relaxed">{feature}</span>
                    </li>
                  );
                })}
              </ul>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <Button 
                className="w-full group relative overflow-hidden" 
                size="sm" 
                asChild
              >
                <Link 
                  href={`/auth/sign-up?plan=${plan.title.toLowerCase().replace(' ', '-')}`}
                  className="relative z-10 transition-transform transform group-hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
                {/* Coming Soon Features */}
                <div className="mt-24 relative">
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 text-sm">
                Coming Soon
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* Core Academy */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="relative z-10">
                  
                  <h3 className="text-2xl font-bold text-white mb-2">Advanced Performance Analytics</h3>
                  <p className="text-gray-400 mb-6">Advanced analytics and personalized insights to elevate your game</p>
                  
                  <div className="space-y-6">
                    <div>
                      
                      <h4 className="text-lg font-semibold text-purple-400 mb-3">Advanced Shot Analysis</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2"></div>
                          Ball speed tracking
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2"></div>
                          Ball placement analysis
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2"></div>
                          Forehand quality metrics
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2"></div>
                          Backhand quality metrics
                        </li>
                      </ul>
                    </div>

                    <div>
                    <h4 className="text-lg font-semibold text-purple-400 mb-3">Real-time Analysis</h4>
                      <ul className="space-y-2 text-gray-300 mb-6">
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2"></div>
                          Live match insights
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2"></div>
                          Instant performance feedback
                        </li>
                      </ul>

                    <h4 className="text-lg font-semibold text-purple-400 mb-3">Advanced Core AI Chatbot Coach</h4>
                      <ul className="space-y-2 text-gray-300 mb-6">
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2"></div>
                          Personalized coaching insights
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2"></div>
                          AI-powered technique analysis
                        </li>
                      </ul>

                      <h4 className="text-lg font-semibold text-purple-400 mb-3">Advanced Movement Analysis</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2"></div>
                          Speed tracking
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2"></div>
                          T position control
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2"></div>
                          Movement heatmaps
                        </li>
                      </ul>
                    </div>
                  </div>


                </div>
              </div>

              {/* Core Connect */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-2">Core Academy & Core Connect</h3>
                  <p className="text-gray-400 mb-6">Connect with pro coaches and players in our exclusive network</p>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-pink-400 mb-3">Professional Development</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-pink-400 mr-2"></div>
                          1-on-1 coaching sessions
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-pink-400 mr-2"></div>
                          Live video analysis
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-pink-400 mr-2"></div>
                          Pro player network access
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-pink-400 mb-3">Community Features</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-pink-400 mr-2"></div>
                          Community challenges
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-pink-400 mr-2"></div>
                          Virtual tournaments
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-pink-400 mr-2"></div>
                          Exclusive training events
                        </li>
                      </ul>
                    </div>
                  </div>

   
                </div>
              </div>
            </div>
          </div>

      {/* Credit Packs Section */}
      {/*
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-center text-white mb-4">Need Extra Credits?</h2>
        <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">
          Credits can be used for extra match uploads, premium coaching sessions in Core Academy, or extended AI Squash Coach conversations. Each credit gives you access to:
          <br/><br/>
          • 1 match upload and analysis<br/>
          • 5 Core AI Squash Coach Chat responses
        </p>
      
        <div className="mx-auto max-w-2xl grid grid-cols-1 gap-4 sm:grid-cols-3">
          {creditPacks.map((pack) => (
            <div
              key={pack.title}
              className="
                rounded-2xl p-6 ring-1 ring-white/10 
                bg-gray-900/50 backdrop-blur-3xl 
                transform transition-all duration-300
                hover:scale-105 hover:shadow-lg hover:shadow-primary/20
                hover:bg-gray-900/70
              "
            >
              <h3 className="text-base font-semibold leading-7 text-white">
                {pack.title}
              </h3>
              <div className="mt-2 inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1">
                <span className="text-sm font-medium text-primary">
                  {pack.credits} Credits
                </span>
              </div>
              <p className="mt-4 flex items-baseline gap-x-1">
                <span className="text-3xl font-bold tracking-tight text-white">
                  ${pack.price}
                </span>
                <span className="text-sm text-gray-400">USD</span>
              </p>
            </div>
          ))}
        </div>
      </div>
      */}
      {/* Core Benefits Section */}
      <div className="mt-16 bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Why Core is Different</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of squash training with our cutting-edge AI-powered platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI-Powered Analysis */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 transform transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">AI-Powered Analysis</h3>
              <p className="text-gray-300">
                Get instant, detailed insights into your game with our advanced AI analysis. Track shots, patterns, and performance metrics in real-time.
              </p>
            </div>

            {/* Personalized Coaching */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 transform transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Personalized Coaching</h3>
              <p className="text-gray-300">
                Receive tailored coaching advice and training plans based on your unique playing style and goals.
              </p>
            </div>

            {/* Professional Network */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 transform transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Professional Network</h3>
              <p className="text-gray-300">
                Connect with top coaches and players worldwide. Schedule sessions and get expert feedback on your game.
              </p>
            </div>

            {/* Match Analytics */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 transform transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Match Analytics</h3>
              <p className="text-gray-300">
                Deep dive into your match statistics, shot accuracy, and court coverage with our comprehensive analytics.
              </p>
            </div>

            {/* Progress Tracking */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 transform transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Progress Tracking</h3>
              <p className="text-gray-300">
                Monitor your improvement over time with detailed progress reports and performance benchmarks.
              </p>
            </div>

            {/* Community & Events */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 transform transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Community & Events</h3>
              <p className="text-gray-300">
                Join a thriving community of players, participate in virtual tournaments, and attend exclusive training events.
              </p>
            </div>
          </div>



        </div>
      </div>
    </div>
  )
}
