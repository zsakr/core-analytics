"use client"

import Link from "next/link"
import { useState } from "react"
import {
  Activity,
  ArrowDown,
  Calendar,
  Clock,
  Download,
  ExternalLink,
  FileText,
  Lightbulb,
  MessageSquare,
  Share2,
  Target,
  Timer,
  Trophy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

// Types for the match report
interface MatchReportProps {
  id: string
  date: string
  opponent: string
  opponentImage?: string
  result: "Won" | "Lost"
  score: string
  duration: string
  rallies: number
  tournament?: string
  location?: string
}

// Colors for the charts
const COLORS = ["#22c55e", "#64748b", "#FFBB28", "#FF8042", "#8884d8", "#94a3b8"]

export function MatchReport({
  id,
  date,
  opponent,
  opponentImage,
  result,
  score,
  duration,
  rallies,
  tournament,
  location,
}: MatchReportProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Parse the score string into an array of game scores
  const gameScores = score.split(", ").map((gameScore) => {
    const [playerScore, opponentScore] = gameScore.split("-").map(Number)
    return { playerScore, opponentScore }
  })

  // Calculate total points
  const totalPoints = gameScores.reduce(
    (acc, game) => {
      return {
        player: acc.player + game.playerScore,
        opponent: acc.opponent + game.opponentScore,
      }
    },
    { player: 0, opponent: 0 },
  )

  // Strategic recommendations based on the data
  const recommendations = [
    {
      title: "Improve Backhand Consistency",
      description: "Your backhand has a higher error rate. Focus on drills that improve consistency and control.",
      icon: Target,
    },
    {
      title: "Utilize Front Right Corner",
      description:
        "You have high efficiency in the front right corner. Consider incorporating more drop shots to this area.",
      icon: Lightbulb,
    },
    {
      title: "Defensive Recovery",
      description: "Work on faster recovery from the back left corner where you have the most errors.",
      icon: Activity,
    },
  ]

  // Training focus areas
  const trainingFocus = [
    {
      area: "Backhand Drop Shots",
      priority: "High",
      description: "Practice backhand drop shots with focus on accuracy and consistency",
    },
    {
      area: "Movement Efficiency",
      priority: "Medium",
      description: "Improve movement from back corners to T position",
    },
    {
      area: "Shot Variation",
      priority: "Medium",
      description: "Incorporate more lobs and boasts to vary your game",
    },
  ]

  // AI coach insights
  const aiCoachInsights = [
    "Your forehand drives are effective, but you could improve your backhand consistency.",
    "You're spending too much time in the back left corner. Work on taking the ball earlier.",
    "Your opponent is using more boasts than you. Consider adding this to your arsenal.",
    "Your shot selection becomes predictable in longer rallies. Try to vary your shots more.",
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-2xl">Match Report</CardTitle>
            <CardDescription>
              Detailed analysis of your match against {opponent} on {date}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <ExternalLink className="mr-2 h-4 w-4" />
              Full Screen
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Match Overview */}
        <div className="rounded-lg border p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center justify-center space-y-2">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg?height=64&width=64" alt="You" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <p className="font-medium">You</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="text-center">
                <Badge className={result === "Won" ? "bg-green-500" : "bg-red-500"}>{result}</Badge>
                <p className="text-2xl font-bold mt-2">{score}</p>
                <p className="text-sm text-muted-foreground">{result === "Won" ? "3-1" : "1-3"} (Best of 5)</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <Avatar className="h-16 w-16">
                <AvatarImage src={opponentImage || "/placeholder.svg?height=64&width=64"} alt={opponent} />
                <AvatarFallback>{opponent.charAt(0)}</AvatarFallback>
              </Avatar>
              <p className="font-medium">{opponent}</p>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="flex items-center text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                <span className="text-xs">Date</span>
              </div>
              <p className="font-medium">{date}</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="flex items-center text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                <span className="text-xs">Duration</span>
              </div>
              <p className="font-medium">{duration}</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="flex items-center text-muted-foreground">
                <Activity className="mr-1 h-4 w-4" />
                <span className="text-xs">Rallies</span>
              </div>
              <p className="font-medium">{rallies}</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="flex items-center text-muted-foreground">
                <Trophy className="mr-1 h-4 w-4" />
                <span className="text-xs">Tournament</span>
              </div>
              <p className="font-medium">{tournament || "Friendly Match"}</p>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Total Points</h3>
              <div className="flex items-center justify-between">
                <span>You</span>
                <span className="font-medium">{totalPoints.player}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{opponent}</span>
                <span className="font-medium">{totalPoints.opponent}</span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Game Scores</h3>
              {gameScores.map((game, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span>Game {index + 1}</span>
                  <span className="font-medium">
                    {game.playerScore}-{game.opponentScore}
                  </span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Performance</h3>
              <div className="flex items-center justify-between">
                <span>Winners</span>
                <span className="font-medium">20</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Errors</span>
                <span className="font-medium">17</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Winner/Error Ratio</span>
                <span className="font-medium">1.18</span>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Tabs */}
        <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="shots">Shot Analysis</TabsTrigger>
            <TabsTrigger value="court">Court Analysis</TabsTrigger>
            <TabsTrigger value="rallies">Rally Analysis</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Match Summary</h3>
                <p className="text-sm text-muted-foreground">
                  {result === "Won"
                    ? `You won this match against ${opponent} with a score of ${score}, taking 3 games to 1 in a best of 5 format. The match lasted ${duration} with a total of ${rallies} rallies.`
                    : `You lost this match against ${opponent} with a score of ${score}, taking 1 game to 3 in a best of 5 format. The match lasted ${duration} with a total of ${rallies} rallies.`}
                </p>
                <p className="text-sm text-muted-foreground">
                  Your overall performance showed strengths in forehand winners and front right corner play, with areas
                  for improvement in backhand consistency and movement from the back left corner.
                </p>

                <h3 className="text-lg font-medium mt-6">Key Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center space-x-2">
                      <Trophy className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Winners</span>
                    </div>
                    <p className="text-2xl font-bold mt-1">20</p>
                    <p className="text-xs text-muted-foreground">12 forehand, 8 backhand</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center space-x-2">
                      <ArrowDown className="h-4 w-4 text-destructive" />
                      <span className="text-sm font-medium">Errors</span>
                    </div>
                    <p className="text-2xl font-bold mt-1">17</p>
                    <p className="text-xs text-muted-foreground">7 forehand, 10 backhand</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center space-x-2">
                      <Timer className="h-4 w-4 text-amber-500" />
                      <span className="text-sm font-medium">Avg. Rally Length</span>
                    </div>
                    <p className="text-2xl font-bold mt-1">12.4</p>
                    <p className="text-xs text-muted-foreground">shots per rally</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Win Rate</span>
                    </div>
                    <p className="text-2xl font-bold mt-1">54%</p>
                    <p className="text-xs text-muted-foreground">of total rallies</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Shot Distribution</h3>
                <div className="h-[300px] bg-muted/20 rounded-md flex items-center justify-center">
                  <div className="text-muted">Shot Distribution Chart</div>
                </div>

                <h3 className="text-lg font-medium mt-4">AI Coach Insights</h3>
                <div className="rounded-lg border p-4 bg-muted/50">
                  <div className="flex items-center space-x-2 mb-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <span className="font-medium">Key Observations</span>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {aiCoachInsights.map((insight, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="mt-1">•</span>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Shot Analysis Tab */}
          <TabsContent value="shots" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Forehand vs Backhand Performance</h3>
                <div className="h-[300px] bg-muted/20 rounded-md flex items-center justify-center">
                  <div className="text-muted">Forehand vs Backhand Chart</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your forehand produced more winners and fewer errors compared to your backhand. Focus on improving
                  backhand consistency, especially under pressure.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Shot Selection Comparison</h3>
                <div className="h-[300px] bg-muted/20 rounded-md flex items-center justify-center">
                  <div className="text-muted">Shot Selection Chart</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  You used more drives and drops than your opponent, who relied more on boasts and lobs. Consider
                  incorporating more shot variety to make your game less predictable.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Shot Effectiveness</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border p-4">
                  <h4 className="text-sm font-medium mb-2">Most Effective Shots</h4>
                  <ol className="space-y-2">
                    <li className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">1.</span>
                        <span>Forehand Drop</span>
                      </div>
                      <Badge>78% Success</Badge>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">2.</span>
                        <span>Forehand Drive</span>
                      </div>
                      <Badge>72% Success</Badge>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">3.</span>
                        <span>Backhand Volley</span>
                      </div>
                      <Badge>65% Success</Badge>
                    </li>
                  </ol>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="text-sm font-medium mb-2">Least Effective Shots</h4>
                  <ol className="space-y-2">
                    <li className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">1.</span>
                        <span>Backhand Boast</span>
                      </div>
                      <Badge variant="outline">38% Success</Badge>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">2.</span>
                        <span>Backhand Lob</span>
                      </div>
                      <Badge variant="outline">42% Success</Badge>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">3.</span>
                        <span>Forehand Boast</span>
                      </div>
                      <Badge variant="outline">45% Success</Badge>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Court Analysis Tab */}
          <TabsContent value="court" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Winners by Zone</h3>
                <div className="aspect-square relative border rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full bg-muted/20 relative">
                      {/* Court lines */}
                      <div className="absolute top-0 left-0 w-full h-full border-2 border-gray-400"></div>
                      <div className="absolute top-1/2 left-0 w-full h-0 border-t-2 border-gray-400"></div>
                      <div className="absolute top-0 left-1/2 w-0 h-full border-l-2 border-gray-400"></div>

                      {/* Sample zone values */}
                      <div className="absolute top-[25%] left-[25%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                        <div className="rounded-full w-[40px] h-[40px] bg-green-500/70 flex items-center justify-center text-white font-bold">
                          8
                        </div>
                        <div className="text-xs mt-1">FL</div>
                      </div>
                      <div className="absolute top-[25%] left-[75%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                        <div className="rounded-full w-[50px] h-[50px] bg-green-500/80 flex items-center justify-center text-white font-bold">
                          12
                        </div>
                        <div className="text-xs mt-1">FR</div>
                      </div>
                      <div className="absolute top-[75%] left-[25%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                        <div className="rounded-full w-[35px] h-[35px] bg-green-500/60 flex items-center justify-center text-white font-bold">
                          4
                        </div>
                        <div className="text-xs mt-1">BL</div>
                      </div>
                      <div className="absolute top-[75%] left-[75%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                        <div className="rounded-full w-[40px] h-[40px] bg-green-500/70 flex items-center justify-center text-white font-bold">
                          6
                        </div>
                        <div className="text-xs mt-1">BR</div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Most of your winners came from the front right corner (12), followed by the front left (8).
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Errors by Zone</h3>
                <div className="aspect-square relative border rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full bg-muted/20 relative">
                      {/* Court lines */}
                      <div className="absolute top-0 left-0 w-full h-full border-2 border-gray-400"></div>
                      <div className="absolute top-1/2 left-0 w-full h-0 border-t-2 border-gray-400"></div>
                      <div className="absolute top-0 left-1/2 w-0 h-full border-l-2 border-gray-400"></div>

                      {/* Sample zone values */}
                      <div className="absolute top-[25%] left-[25%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                        <div className="rounded-full w-[40px] h-[40px] bg-red-500/70 flex items-center justify-center text-white font-bold">
                          5
                        </div>
                        <div className="text-xs mt-1">FL</div>
                      </div>
                      <div className="absolute top-[75%] left-[25%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                        <div className="rounded-full w-[45px] h-[45px] bg-red-500/80 flex items-center justify-center text-white font-bold">
                          8
                        </div>
                        <div className="text-xs mt-1">BL</div>
                      </div>
                      <div className="absolute top-[75%] left-[75%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                        <div className="rounded-full w-[40px] h-[40px] bg-red-500/70 flex items-center justify-center text-white font-bold">
                          7
                        </div>
                        <div className="text-xs mt-1">BR</div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Most of your errors occurred in the back left corner (8) and back right corner (7).
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Efficiency by Zone (%)</h3>
                <div className="aspect-square relative border rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full bg-muted/20 relative">
                      {/* Court lines */}
                      <div className="absolute top-0 left-0 w-full h-full border-2 border-gray-400"></div>
                      <div className="absolute top-1/2 left-0 w-full h-0 border-t-2 border-gray-400"></div>
                      <div className="absolute top-0 left-1/2 w-0 h-full border-l-2 border-gray-400"></div>

                      {/* Sample zone values */}
                      <div className="absolute top-[25%] left-[25%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                        <div className="rounded-full w-[50px] h-[50px] bg-yellow-500/80 flex items-center justify-center text-white font-bold">
                          62%
                        </div>
                        <div className="text-xs mt-1">FL</div>
                      </div>
                      <div className="absolute top-[25%] left-[75%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                        <div className="rounded-full w-[50px] h-[50px] bg-green-500/80 flex items-center justify-center text-white font-bold">
                          75%
                        </div>
                        <div className="text-xs mt-1">FR</div>
                      </div>
                      <div className="absolute top-[75%] left-[25%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                        <div className="rounded-full w-[50px] h-[50px] bg-red-500/80 flex items-center justify-center text-white font-bold">
                          45%
                        </div>
                        <div className="text-xs mt-1">BL</div>
                      </div>
                      <div className="absolute top-[75%] left-[75%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                        <div className="rounded-full w-[50px] h-[50px] bg-yellow-500/70 flex items-center justify-center text-white font-bold">
                          48%
                        </div>
                        <div className="text-xs mt-1">BR</div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your highest efficiency is in the front right corner (75%), while your lowest is in the back left
                  corner (45%).
                </p>
              </div>
            </div>

            <div className="space-y-4 mt-6">
              <h3 className="text-lg font-medium">Court Position Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border p-4">
                  <h4 className="text-sm font-medium mb-2">T Position Control</h4>
                  <div className="flex items-center justify-between">
                    <span>You</span>
                    <div className="flex-1 mx-4">
                      <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                        <div className="h-full bg-primary" style={{ width: "65%" }}></div>
                      </div>
                    </div>
                    <span className="font-medium">65%</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span>{opponent}</span>
                    <div className="flex-1 mx-4">
                      <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                        <div className="h-full bg-orange-500" style={{ width: "58%" }}></div>
                      </div>
                    </div>
                    <span className="font-medium">58%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    You controlled the T position 65% of the time, giving you a slight advantage in court positioning.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="text-sm font-medium mb-2">Movement Efficiency</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Distance Covered</span>
                      <span className="font-medium">2.4 km</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Avg. Distance per Rally</span>
                      <span className="font-medium">24.5 m</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Recovery Speed</span>
                      <span className="font-medium">1.8 m/s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Movement Efficiency</span>
                      <span className="font-medium">72%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Rally Analysis Tab */}
          <TabsContent value="rallies" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Rally Length Distribution</h3>
                <div className="h-[300px] bg-muted/20 rounded-md flex items-center justify-center">
                  <div className="text-muted">Rally Length Chart</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  You performed best in medium-length rallies (6-10 shots) with a 58% win rate. Your performance
                  declined in longer rallies (16+ shots).
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Rally Win Rate by Game</h3>
                <div className="h-[300px] bg-muted/20 rounded-md flex items-center justify-center">
                  <div className="text-muted">Win Rate Chart</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your rally win rate decreased in Game 3, possibly indicating fatigue or a tactical adjustment by your
                  opponent.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Critical Rallies Analysis</h3>
              <div className="rounded-lg border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-sm font-medium">Rally #</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Game</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Score</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Length</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Result</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Key Observation</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3 text-sm">12</td>
                        <td className="px-4 py-3 text-sm">Game 1</td>
                        <td className="px-4 py-3 text-sm">9-8</td>
                        <td className="px-4 py-3 text-sm">18 shots</td>
                        <td className="px-4 py-3 text-sm">
                          <Badge className="bg-green-500">Won</Badge>
                        </td>
                        <td className="px-4 py-3 text-sm">Game-winning forehand drop shot</td>
                      </tr>
                      <tr className="border-t hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3 text-sm">24</td>
                        <td className="px-4 py-3 text-sm">Game 2</td>
                        <td className="px-4 py-3 text-sm">8-9</td>
                        <td className="px-4 py-3 text-sm">22 shots</td>
                        <td className="px-4 py-3 text-sm">
                          <Badge className="bg-red-500">Lost</Badge>
                        </td>
                        <td className="px-4 py-3 text-sm">Backhand error under pressure</td>
                      </tr>
                      <tr className="border-t hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3 text-sm">38</td>
                        <td className="px-4 py-3 text-sm">Game 3</td>
                        <td className="px-4 py-3 text-sm">7-9</td>
                        <td className="px-4 py-3 text-sm">16 shots</td>
                        <td className="px-4 py-3 text-sm">
                          <Badge className="bg-red-500">Lost</Badge>
                        </td>
                        <td className="px-4 py-3 text-sm">Poor movement from back corner</td>
                      </tr>
                      <tr className="border-t hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3 text-sm">52</td>
                        <td className="px-4 py-3 text-sm">Game 4</td>
                        <td className="px-4 py-3 text-sm">10-7</td>
                        <td className="px-4 py-3 text-sm">14 shots</td>
                        <td className="px-4 py-3 text-sm">
                          <Badge className="bg-green-500">Won</Badge>
                        </td>
                        <td className="px-4 py-3 text-sm">Excellent volley winner</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1 md:col-span-2 space-y-4">
                <h3 className="text-lg font-medium">Strategic Recommendations</h3>
                <div className="space-y-4">
                  {recommendations.map((recommendation, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-primary/10 p-3">
                          <recommendation.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{recommendation.title}</h4>
                          <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Training Focus Areas</h3>
                <div className="space-y-2">
                  {trainingFocus.map((focus, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{focus.area}</span>
                        <Badge
                          className={
                            focus.priority === "High"
                              ? "bg-red-500"
                              : focus.priority === "Medium"
                                ? "bg-amber-500"
                                : "bg-green-500"
                          }
                        >
                          {focus.priority} Priority
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{focus.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-4">
              <h3 className="text-lg font-medium">AI Coach Insights</h3>
              <div className="rounded-lg border p-4 bg-muted/50">
                <div className="flex items-center space-x-2 mb-4">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <span className="font-medium">Personalized Feedback</span>
                </div>
                <div className="space-y-4">
                  <p className="text-sm">
                    Based on your performance in this match, here are some key insights and recommendations:
                  </p>
                  <ul className="space-y-2 text-sm">
                    {aiCoachInsights.map((insight, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="mt-1">•</span>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="rounded-lg bg-background p-4 mt-4">
                    <h4 className="text-sm font-medium mb-2">Suggested Drills</h4>
                    <ol className="space-y-2 text-sm list-decimal list-inside">
                      <li>Backhand drop shot accuracy drill (20 minutes)</li>
                      <li>T-position recovery from back corners (15 minutes)</li>
                      <li>Shot variation practice with focus on boasts and lobs (25 minutes)</li>
                      <li>Endurance training for longer rallies (30 minutes)</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Export as PDF
              </Button>
              <Button variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Share Report
              </Button>
              <Button>
                <MessageSquare className="mr-2 h-4 w-4" />
                Discuss with AI Coach
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/profile?tab=reports">Back to Reports</Link>
        </Button>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Download Full Report
        </Button>
      </CardFooter>
    </Card>
  )
}

