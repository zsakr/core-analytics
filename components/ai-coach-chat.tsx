"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Bot, Send, User, X, Minimize2, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

type Message = {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function AICoachChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! I'm your AI Squash Coach. How can I help you with your game today?",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Sample responses for demo purposes
  const sampleResponses = [
    "Based on your recent match analysis, I notice your backhand drives are landing too high on the front wall. Try focusing on keeping your racket face more closed at impact.",
    "Your movement data shows you're covering more distance than necessary. Work on your T position recovery to improve efficiency.",
    "Looking at your shot distribution, you're relying heavily on crosscourt shots. Try incorporating more straight drives to vary your attack.",
    "Your rally length statistics indicate you're winning more points in longer rallies. Consider a more patient approach against aggressive opponents.",
    "I see your error rate increases in the third game. This could indicate fatigue - consider some specific conditioning exercises I can recommend.",
    "Your front wall placement is excellent, but your shot speed is inconsistent. Focus on maintaining a consistent swing tempo.",
    "Based on your heat map, you're spending too much time in the back corners. Work on taking the ball earlier to improve court position.",
  ]

  const handleSendMessage = () => {
    if (input.trim() === "") return

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)]
      const aiMessage: Message = {
        role: "assistant",
        content: randomResponse,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="fixed bottom-4 right-4 rounded-full h-14 w-14 p-0 shadow-lg">
        <Bot className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card
      className={`fixed right-4 shadow-lg transition-all duration-300 ${
        isMinimized ? "bottom-4 h-14 w-80" : "bottom-4 h-[500px] w-80 md:w-96"
      }`}
    >
      <CardHeader className="flex flex-row items-center justify-between p-3 border-b">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI Squash Coach
          {isLoading && (
            <Badge variant="outline" className="ml-2 animate-pulse">
              Thinking...
            </Badge>
          )}
        </CardTitle>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsMinimized(!isMinimized)}>
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <>
          <CardContent className="p-0">
            <ScrollArea className="h-[380px] p-4">
              <div className="flex flex-col gap-3">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`flex gap-2 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <div
                        className={`flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full ${
                          message.role === "user" ? "bg-primary" : "bg-muted"
                        }`}
                      >
                        {message.role === "user" ? (
                          <User className="h-4 w-4 text-primary-foreground" />
                        ) : (
                          <Bot className="h-4 w-4" />
                        )}
                      </div>
                      <div
                        className={`rounded-lg px-3 py-2 text-sm ${
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        {message.content}
                        <div
                          className={`mt-1 text-xs ${
                            message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-3 pt-0">
            <div className="flex w-full items-center gap-2">
              <Textarea
                placeholder="Ask about your game..."
                className="min-h-9 resize-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button size="icon" onClick={handleSendMessage} disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  )
}

