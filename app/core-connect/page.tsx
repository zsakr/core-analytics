import Link from "next/link"
import {
  ArrowRight,
  Users,
  Globe,
  Calendar,
  Trophy,
  MessageSquare,
  Handshake,
  Award,
  CheckCircle,
  UserCheck,
  Building,
  Map,
  Star,
  Zap,
  Activity,
  Target,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CoreConnectPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Core Connect</h1>
            <p className="text-muted-foreground">
              The global squash community platform connecting players, coaches, and clubs worldwide
            </p>
          </div>
          <Button asChild>
            <Link href="/memberships">Join Now</Link>
          </Button>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-blue-500/10 p-3">
                  <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle>Global Network</CardTitle>
                  <CardDescription>Connect with the worldwide squash community</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Core Connect brings together players, coaches, and clubs from around the world, creating a vibrant
                community where you can share experiences, find partners, and grow your network within the sport.
              </p>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Find practice partners</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Connect with coaches</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Discover clubs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Join communities</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-green-500/10 p-3">
                  <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <CardTitle>Events & Tournaments</CardTitle>
                  <CardDescription>Stay updated on squash events worldwide</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Discover and participate in local, national, and international squash events. Our comprehensive calendar
                helps you find competitions, exhibitions, clinics, and social events in your area.
              </p>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Tournament listings</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Training camps</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Exhibition matches</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Community events</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Player Network</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Connect with players of similar skill levels for practice matches, tournaments, and social play.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Community Forums</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Engage in discussions on technique, equipment, tournaments, and training with the global community.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Rankings & Leaderboards</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Track your progress and compare your performance with players across different levels and regions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Handshake className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Partner Matching</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Find practice partners, coaches, or clubs that match your skill level, goals, and location.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Pro Player Insights</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Access exclusive content, tips, and insights from professional players and coaches.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Performance Tracking</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Monitor your development with comprehensive performance metrics and progress reports.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pro Players Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Pro Players & Partnerships</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-purple-500/10 p-3">
                  <Star className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <CardTitle>Professional Players</CardTitle>
                  <CardDescription>Learn from the world's best</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-lg border">
                  <div className="rounded-full bg-purple-100 dark:bg-purple-900 p-3">
                    <UserCheck className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium">Ali Farag</p>
                    <p className="text-xs text-muted-foreground">World #1 • Egypt</p>
                    <Badge className="mt-1">Ambassador</Badge>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg border">
                  <div className="rounded-full bg-purple-100 dark:bg-purple-900 p-3">
                    <UserCheck className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium">Nouran Gohar</p>
                    <p className="text-xs text-muted-foreground">World #1 • Egypt</p>
                    <Badge className="mt-1">Technical Advisor</Badge>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg border">
                  <div className="rounded-full bg-purple-100 dark:bg-purple-900 p-3">
                    <UserCheck className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium">Paul Coll</p>
                    <p className="text-xs text-muted-foreground">World #2 • New Zealand</p>
                    <Badge className="mt-1">Ambassador</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-blue-500/10 p-3">
                  <Building className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle>Organizational Partners</CardTitle>
                  <CardDescription>Collaborations that elevate the sport</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-lg border">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3">
                    <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium">Professional Squash Association</p>
                    <p className="text-xs text-muted-foreground">Official Analytics Partner</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg border">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3">
                    <Building className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium">Harvard University Squash</p>
                    <p className="text-xs text-muted-foreground">Academic Partner</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg border">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3">
                    <Map className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium">National Squash Federation</p>
                    <p className="text-xs text-muted-foreground">Development Partner</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Leaderboard Preview</h2>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-amber-500/10 p-3">
                  <Trophy className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <CardTitle>Global Rankings</CardTitle>
                  <CardDescription>Top players in the Core Connect community</CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                Updated Weekly
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900">
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Ali Farag</p>
                    <p className="text-xs text-muted-foreground">Egypt • Rating: 2150</p>
                  </div>
                </div>
                <Badge className="bg-green-500">+15</Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800">
                    <span className="text-xs font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Paul Coll</p>
                    <p className="text-xs text-muted-foreground">New Zealand • Rating: 2120</p>
                  </div>
                </div>
                <Badge className="bg-green-500">+8</Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-50 dark:bg-amber-950">
                    <span className="text-xs font-bold text-amber-600/70 dark:text-amber-400/70">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Nouran Gohar</p>
                    <p className="text-xs text-muted-foreground">Egypt • Rating: 2105</p>
                  </div>
                </div>
                <Badge className="bg-green-500">+12</Badge>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Upcoming Events */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                <CardTitle className="text-lg">City Open Championship</CardTitle>
              </div>
              <CardDescription>June 15-18, 2023 • Downtown Squash Club</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <Badge className="mb-3">Intermediate Division</Badge>
              <p className="text-sm text-muted-foreground mb-4">
                A premier local tournament featuring players from across the region competing in various skill
                divisions.
              </p>
              <Button size="sm" className="w-full">
                Register
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                <CardTitle className="text-lg">Regional League Finals</CardTitle>
              </div>
              <CardDescription>July 8-10, 2023 • Metro Squash Center</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <Badge className="mb-3">All Divisions</Badge>
              <p className="text-sm text-muted-foreground mb-4">
                The culmination of the regional league season with top teams competing for the championship title.
              </p>
              <Button size="sm" className="w-full">
                Register
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-500" />
                <CardTitle className="text-lg">Summer Training Camp</CardTitle>
              </div>
              <CardDescription>August 5-6, 2023 • University Courts</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <Badge className="mb-3">All Skill Levels</Badge>
              <p className="text-sm text-muted-foreground mb-4">
                Intensive training sessions led by professional coaches focusing on technique, fitness, and strategy.
              </p>
              <Button size="sm" className="w-full">
                Register
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <Card className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
          <CardContent className="p-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <Target className="h-12 w-12 mb-2" />
              <h2 className="text-3xl font-bold">Join Core Connect Today</h2>
              <p className="max-w-[600px]">
                Become part of the global squash community and take your game to the next level with access to players,
                coaches, events, and resources worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
                  <Link href="/memberships">
                    Join Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link href="/core-insights">Explore Features</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

