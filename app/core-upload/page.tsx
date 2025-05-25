"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"

export default function CoreUploadPage() {
  const [file, setFile] = React.useState<File | null>(null)
  const [uploading, setUploading] = React.useState(false)
  const [progress, setProgress] = React.useState(0)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setProgress(0)

    try {
      // TODO: Implement actual file upload logic
      // Simulating upload progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200))
        setProgress(i)
      }

      // Reset after upload
      setFile(null)
      setProgress(0)
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Core Upload</CardTitle>
          <CardDescription>
            Upload your match videos for analysis. We are releasing an update by June 17th.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="video">Video File</Label>
              <Input
                id="video"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                disabled={uploading}
              />
            </div>
            {file && (
              <div className="text-sm text-muted-foreground">
                Selected file: {file.name}
              </div>
            )}
            <Button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="w-full"
            >
              {uploading ? (
                <>
                  <span className="mr-2">Uploading... {progress}%</span>
                  <Upload className="h-4 w-4 animate-bounce" />
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Video
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
