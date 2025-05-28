"use client";

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, Brain, Calendar, FileText, Target, Users, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function CoreHubPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <Image
            src="/images/squash-tournament-venue.jpeg"
            alt="Professional squash tournament in a grand venue"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container px-4 md:px-6 relative z-20">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                Elite Coaching at Your Fingertips
              </h1>
              <p className="max-w-[600px] mx-auto text-white md:text-xl">
                Connect with world-class squash coaches from the Core team for personalized, one-on-one sessions that will transform your game.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row mt-6">
              <Button asChild size="lg" variant="secondary" className="font-medium">
                <Link href="#features">
                  Explore Features <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-white text-white dark:border-primary dark:text-primary hover:bg-white/10 dark:hover:bg-primary/10"
              >
                <Link href="#coaching">Coaching Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What is Core Academy Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground dark:text-white">Elite Coaching Experience</h2>
              <p className="max-w-[900px] text-foreground/80 dark:text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Experience personalized coaching from elite squash professionals who have competed and coached at the highest levels. Our coaches combine their expertise with Core's cutting-edge AI analysis to provide unparalleled training.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 mt-12">
            <div className="flex flex-col space-y-4">
              <h3 className="text-2xl font-bold text-foreground dark:text-white">Meet Our Elite Coaches</h3>
              <p className="text-foreground/80 dark:text-white/80">
                Our coaching team includes former professional players, national champions, and certified instructors with decades of experience. They're not just coaches – they're mentors dedicated to your success.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary dark:text-white" />
                  <span className="text-foreground dark:text-white">Former professional players</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary dark:text-white" />
                  <span className="text-foreground dark:text-white">National and international champions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary dark:text-white" />
                  <span>Certified professional instructors</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Experienced with all skill levels</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col space-y-4">
              <h3 className="text-2xl font-bold">Why Choose Core Academy Coaching?</h3>
              <p className="text-muted-foreground">
                Experience the perfect blend of human expertise and AI technology. Our coaches use Core's advanced analytics to provide deeper insights and more effective training.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>AI-enhanced coaching sessions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Data-driven improvement plans</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Flexible online scheduling</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Coaching Services</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Experience personalized coaching that combines human expertise with cutting-edge technology.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-12">
            <Card>
              <CardHeader>
                <div className="rounded-full bg-primary/10 p-3 w-fit mb-2">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Video Analysis</CardTitle>
                <CardDescription>In-depth analysis of your match footage</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Upload your match videos and receive detailed analysis from our expert coaches. Identify strengths,
                  weaknesses, and areas for improvement with frame-by-frame breakdown.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="rounded-full bg-primary/10 p-3 w-fit mb-2">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Personalized Coaching Plans</CardTitle>
                <CardDescription>Tailored to your goals</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Work with your coach to create a customized development plan. Whether you're preparing for tournaments or improving your recreational game, we'll design a program that fits your schedule and ambitions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="rounded-full bg-primary/10 dark:bg-white/10 p-3 w-fit mb-2">
                  <Brain className="h-6 w-6 text-primary dark:text-white" />
                </div>
                <CardTitle className="text-foreground dark:text-white">AI-Enhanced Coaching</CardTitle>
                <CardDescription className="text-foreground/60 dark:text-white/60">Technology meets expertise</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/80 dark:text-white/80">
                  Your coach uses Core's advanced AI analysis to provide deeper insights into your game. Get detailed breakdowns of your technique, movement patterns, and tactical decisions backed by data.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="rounded-full bg-primary/10 p-3 w-fit mb-2">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Tournament Preparation</CardTitle>
                <CardDescription>Compete at your best</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Get specialized coaching for upcoming tournaments. Your coach will help you develop match strategies, prepare mentally, and peak at the right time for important competitions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="rounded-full bg-primary/10 p-3 w-fit mb-2">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Flexible Scheduling</CardTitle>
                <CardDescription>Coaching that fits your life</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Book sessions at times that work for you. Our coaches are available across different time zones, making it easy to find slots that fit your schedule, whether you're an early bird or night owl.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary dark:bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 dark:bg-black/10" />
        <div className="container px-4 md:px-6 relative">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white dark:text-black">
                Transform Your Game Today
              </h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-white/90 dark:text-black/90">
                Join elite players who've already elevated their performance with Core's AI-powered coaching platform
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="bg-white dark:bg-black text-black dark:text-white hover:bg-white/90 dark:hover:bg-black/90" asChild>
                <Link href="/memberships">
                  Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white text-white dark:border-black dark:text-black hover:bg-white/10 dark:hover:bg-black/10"
              >
                <Link href="/core-connect">View Success Stories</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CoreHubPage;
