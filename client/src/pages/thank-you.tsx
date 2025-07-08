import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Share2, Users, Rocket } from "lucide-react";
import { Link } from "wouter";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue to-brand-blue-dark flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Welcome to the ContentFlow AI Waitlist!
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            You're now part of an exclusive group of forward-thinking creators who will get first access to our AI-powered content repurposing tool.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">What happens next:</h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-brand-blue rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Check your email</h3>
                  <p className="text-slate-600 text-sm">We've sent you a confirmation with early access details and exclusive updates.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Join our community</h3>
                  <p className="text-slate-600 text-sm">Get access to our private Discord where we share development updates and gather feedback.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-brand-amber rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Get early access</h3>
                  <p className="text-slate-600 text-sm">You'll be among the first 100 to try ContentFlow AI when we launch in Q1 2025.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="p-4 bg-purple-50 border-purple-200">
              <CardContent className="p-0 text-center">
                <Rocket className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-slate-800">50% Discount</h3>
                <p className="text-sm text-slate-600">On your first 3 months</p>
              </CardContent>
            </Card>
            
            <Card className="p-4 bg-green-50 border-green-200">
              <CardContent className="p-0 text-center">
                <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-slate-800">VIP Access</h3>
                <p className="text-sm text-slate-600">Founder's community</p>
              </CardContent>
            </Card>
            
            <Card className="p-4 bg-blue-50 border-blue-200">
              <CardContent className="p-0 text-center">
                <Share2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-slate-800">Beta Features</h3>
                <p className="text-sm text-slate-600">Test new features first</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="outline" className="w-full sm:w-auto">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Homepage
              </Button>
            </Link>
            
            <Button 
              className="w-full sm:w-auto bg-brand-blue hover:bg-brand-blue-dark"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'ContentFlow AI - AI-Powered Content Repurposing',
                    text: 'Check out ContentFlow AI - turn your long-form content into viral social posts with one click!',
                    url: window.location.origin,
                  });
                } else {
                  // Fallback for browsers that don't support Web Share API
                  navigator.clipboard.writeText(window.location.origin);
                }
              }}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share with Friends
            </Button>
          </div>

          <p className="text-sm text-slate-500 mt-8">
            Have questions? Reply to our welcome email or reach out at hello@contentflow.ai
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
