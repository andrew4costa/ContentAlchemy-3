import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import WaitlistForm from "@/components/waitlist-form";
import { 
  WandSparkles, 
  Clock, 
  Puzzle, 
  DollarSign, 
  Upload, 
  Brain, 
  Share2, 
  Mic, 
  Presentation, 
  Video, 
  MousePointer, 
  Wallet, 
  Rocket, 
  Cog, 
  Check, 
  X, 
  Star, 
  Tag, 
  Users, 
  Linkedin, 
  Instagram,
  Play
} from "lucide-react";

export default function Landing() {
  const { data: waitlistCount } = useQuery({
    queryKey: ["/api/waitlist/count"],
  });

  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById("waitlist");
    if (waitlistSection) {
      waitlistSection.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <WandSparkles className="text-2xl text-brand-blue mr-3" />
                <span className="text-xl font-bold text-slate-800">ContentFlow AI</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#features" className="text-slate-600 hover:text-brand-blue px-3 py-2 text-sm font-medium transition-colors">Features</a>
                <a href="#use-cases" className="text-slate-600 hover:text-brand-blue px-3 py-2 text-sm font-medium transition-colors">Use Cases</a>
                <a href="#waitlist" className="text-slate-600 hover:text-brand-blue px-3 py-2 text-sm font-medium transition-colors">Early Access</a>
                <Button 
                  onClick={scrollToWaitlist}
                  className="bg-brand-blue hover:bg-brand-blue-dark text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  Join Waitlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-blue to-brand-blue-dark overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Turn Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                  Long-Form Content
                </span>
                Into Viral Social Posts
              </h1>
              <p className="text-xl lg:text-2xl mb-8 leading-relaxed text-[#f0b111]">
                AI-powered repurposing tool that transforms your videos, podcasts, and articles into engaging LinkedIn posts, Instagram Reels, X posts, and TikToks—all in one click.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Button 
                  onClick={scrollToWaitlist}
                  className="bg-white text-brand-blue hover:bg-gray-50 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  <Rocket className="mr-2" />
                  Get Early Access
                </Button>
              </div>
              <div className="flex items-center justify-center lg:justify-start text-blue-200 text-sm">
                <Check className="mr-2 h-4 w-4" />
                <span className="text-[#f0b111]">No technical setup required • Context-aware AI • Multi-platform ready</span>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Content creator working at modern computer setup" 
                className="rounded-2xl shadow-2xl w-full h-auto" 
              />
              
            </div>
          </div>
        </div>
      </section>
      {/* Problem Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-6">
              The Content Creator's Dilemma
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              You spend hours creating amazing long-form content, but struggle to extract maximum value from it across different social platforms.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 bg-red-50 border-red-100">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="text-red-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Time Consuming</h3>
                <p className="text-slate-600">Manual repurposing takes 2-3 hours per piece of content, eating into creation time.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 bg-orange-50 border-orange-100">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Puzzle className="text-orange-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Platform Complexity</h3>
                <p className="text-slate-600">Each platform needs different formats, tones, and optimization strategies.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 bg-yellow-50 border-yellow-100">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <DollarSign className="text-yellow-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Expensive Tools</h3>
                <p className="text-slate-600">Existing solutions cost $200+ per month and require technical expertise.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Solution Preview */}
      <section className="py-20 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-6">
              One Upload. Multiple Platforms.{" "}
              <span className="text-brand-blue">Zero Hassle.</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              ContentFlow AI analyzes your content's context and automatically creates platform-optimized posts that match each platform's unique style and audience.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Professional podcast recording setup with microphone and headphones" 
                className="rounded-2xl shadow-lg w-full h-auto" 
              />
            </div>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-brand-blue rounded-xl flex items-center justify-center flex-shrink-0">
                  <Upload className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">1. Upload Your Content</h3>
                  <p className="text-slate-600">Drop your video, podcast, or article. Our AI understands the context, key points, and tone.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-brand-green rounded-xl flex items-center justify-center flex-shrink-0">
                  <Brain className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">2. AI Analyzes & Adapts</h3>
                  <p className="text-slate-600">Smart algorithms extract key insights and adapt them for each platform's unique requirements.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-brand-amber rounded-xl flex items-center justify-center flex-shrink-0">
                  <Share2 className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">3. Get Multi-Platform Posts</h3>
                  <p className="text-slate-600">Receive professional LinkedIn posts, viral TikTok scripts, engaging X posts, and Instagram captions—all ready to publish.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Use Cases */}
      <section id="use-cases" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-6">
              Perfect For Every Type of Creator
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Whether you're building a personal brand or growing a business, ContentFlow adapts to your unique content style and audience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                  <Mic className="text-purple-600 text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Podcasters</h3>
                <p className="text-slate-600 mb-6">Transform your hour-long episodes into bite-sized social content that drives new listeners to your show.</p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-slate-600">
                    <Check className="text-purple-600 mr-3 h-4 w-4" />
                    <span>Episode highlights for LinkedIn</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Check className="text-purple-600 mr-3 h-4 w-4" />
                    <span>Quote cards for Instagram</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Check className="text-purple-600 mr-3 h-4 w-4" />
                    <span>X threads with key insights</span>
                  </div>
                </div>
                <div className="mt-6">
                  <img 
                    src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250" 
                    alt="Podcast recording setup with professional microphone and audio equipment" 
                    className="rounded-xl w-full h-32 object-cover" 
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Presentation className="text-green-600 text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Coaches & Consultants</h3>
                <p className="text-slate-600 mb-6">Turn your training videos and client calls into valuable content that showcases your expertise.</p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-slate-600">
                    <Check className="text-green-600 mr-3 h-4 w-4" />
                    <span>Authority-building LinkedIn posts</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Check className="text-green-600 mr-3 h-4 w-4" />
                    <span>Educational TikTok scripts</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Check className="text-green-600 mr-3 h-4 w-4" />
                    <span>Inspirational Instagram stories</span>
                  </div>
                </div>
                <div className="mt-6">
                  <img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250" 
                    alt="Professional coach presenting to a group in modern office setting" 
                    className="rounded-xl w-full h-32 object-cover" 
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Video className="text-blue-600 text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Video Creators</h3>
                <p className="text-slate-600 mb-6">Maximize your YouTube content by creating promotional materials for every social platform.</p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-slate-600">
                    <Check className="text-blue-600 mr-3 h-4 w-4" />
                    <span>Teaser clips for Instagram Reels</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Check className="text-blue-600 mr-3 h-4 w-4" />
                    <span>Behind-the-scenes X content</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Check className="text-blue-600 mr-3 h-4 w-4" />
                    <span>Professional LinkedIn updates</span>
                  </div>
                </div>
                <div className="mt-6">
                  <img 
                    src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250" 
                    alt="Modern video editing workspace with multiple monitors and editing software" 
                    className="rounded-xl w-full h-32 object-cover" 
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Platform Examples */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-6">
              See The AI In Action
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From one piece of content, get perfectly formatted posts for every major platform—each with the right tone, length, and engagement hooks.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-8">From This Podcast Episode:</h3>
              <Card className="shadow-lg border-slate-200">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <Mic className="text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">Episode #47: Building Resilience</h4>
                      <p className="text-sm text-slate-500">42 minutes • Productivity & Mindset</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm">
                    "In today's episode, we dive deep into the psychology of resilience and how successful entrepreneurs bounce back from failure. I share my framework for turning setbacks into comebacks, including the three-step process I used when my first startup failed..."
                  </p>
                  <div className="mt-4 flex items-center text-sm text-slate-500">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>Original content: 42 minutes</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-8">Creates These Posts:</h3>
              <div className="space-y-4">
                <Card className="shadow-md border-slate-200">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-3">
                      <Linkedin className="text-blue-600 text-lg mr-2" />
                      <span className="font-medium text-slate-700">LinkedIn Post</span>
                      <span className="ml-auto bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">Professional</span>
                    </div>
                    <p className="text-sm text-slate-600">
                      "Failure isn't the opposite of success—it's a prerequisite. When my first startup collapsed, I learned the 3-step resilience framework that changed everything: 1) Reflect without ruminating 2) Extract actionable lessons 3) Apply immediately to the next challenge. The most successful entrepreneurs I know have failed more times than others have even tried. What failure taught you the most? 👇"
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-md border-slate-200">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-3">
                      <X className="text-blue-400 text-lg mr-2" />
                      <span className="font-medium text-slate-700">X Thread</span>
                      <span className="ml-auto bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">Conversational</span>
                    </div>
                    <p className="text-sm text-slate-600">
                      "My first startup failed spectacularly. Here's the 3-step framework that turned that failure into my biggest advantage: 🧵"
                    </p>
                    <p className="text-xs text-slate-500 mt-2">+ 6 more posts in thread</p>
                  </CardContent>
                </Card>

                <Card className="shadow-md border-slate-200">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-3">
                      <Instagram className="text-pink-600 text-lg mr-2" />
                      <span className="font-medium text-slate-700">Instagram Reel</span>
                      <span className="ml-auto bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded">Visual</span>
                    </div>
                    <p className="text-sm text-slate-600">
                      "POV: Your startup just failed but you know the 3-step comeback formula 💪 #entrepreneur #resilience #startup"
                    </p>
                    <p className="text-xs text-slate-500 mt-2">+ Visual hook suggestions & trending audio</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-6">
              Why ContentFlow AI Is Different
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Built specifically for independent creators who need professional results without the enterprise-level complexity and cost.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MousePointer className="text-blue-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">True One-Click Processing</h3>
                <p className="text-slate-600">No templates to fill out, no manual editing required. Upload once, get everything.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="text-green-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Context-Aware AI</h3>
                <p className="text-slate-600">Understands your content's tone, key messages, and adapts them for each platform's unique style.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Wallet className="text-purple-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Creator-Friendly Pricing</h3>
                <p className="text-slate-600">Starting at just $29/month—not the $200+ that agency tools charge.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 bg-gradient-to-br from-orange-50 to-red-50 border-orange-100">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Share2 className="text-orange-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Multi-Format Output</h3>
                <p className="text-slate-600">Get captions, hashtags, graphics suggestions, and video clips—everything you need to post.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-100">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Rocket className="text-teal-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Instant Results</h3>
                <p className="text-slate-600">Process and receive your optimized content in under 2 minutes, not hours.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-100">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Cog className="text-yellow-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Zero Technical Setup</h3>
                <p className="text-slate-600">No integrations, no APIs, no learning curve. Works with any content format out of the box.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Waitlist Section */}
      <section id="waitlist" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-6">
              Join The Waitlist
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Be among the first 100 creators to get early access and lock in special launch pricing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-blue mb-2">
                {waitlistCount?.count || 0}+
              </div>
              <div className="text-slate-600">Creators on Waitlist</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-blue mb-2">50%</div>
              <div className="text-slate-600">Launch Discount</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-blue mb-2">Q1 2025</div>
              <div className="text-slate-600">Expected Launch</div>
            </div>
          </div>

          <Card className="bg-gradient-to-r from-slate-50 to-blue-50 p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">What You'll Get:</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Star className="text-brand-amber mr-3 h-5 w-5" />
                    <span className="text-slate-700">First access when we launch</span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="text-brand-amber mr-3 h-5 w-5" />
                    <span className="text-slate-700">50% off your first 3 months</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="text-brand-amber mr-3 h-5 w-5" />
                    <span className="text-slate-700">Exclusive founder's community access</span>
                  </div>
                  <div className="flex items-center">
                    <Mic className="text-brand-amber mr-3 h-5 w-5" />
                    <span className="text-slate-700">Direct input on features and development</span>
                  </div>
                </div>
              </div>

              <WaitlistForm />
            </div>
          </Card>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center mb-4">
                <WandSparkles className="text-2xl text-brand-blue mr-3" />
                <span className="text-xl font-bold">ContentFlow AI</span>
              </div>
              <p className="text-slate-300 mb-6 max-w-md">
                Transform your long-form content into viral social posts with AI-powered repurposing that understands context and adapts to every platform.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <X className="text-xl" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Linkedin className="text-xl" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Instagram className="text-xl" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#use-cases" className="hover:text-white transition-colors">Use Cases</a></li>
                <li><a href="#waitlist" className="hover:text-white transition-colors">Join Waitlist</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 ContentFlow AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
