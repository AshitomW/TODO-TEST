import Button from "@/components/ui/Button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100 flex flex-col">
      {/* Navigation */}
      <nav className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-primary-700">iTodo</div>
          <div className="space-x-4">
            <Button href="/login" variant="secondary" size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-4xl">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Conquer Your To-Dos,
            <span className="text-primary-600 block"> Transform Your Life</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Take control of your day with iTodo, the app that keeps your tasks
            organized, your priorities clear, and your workflow effortless.
            Beautifully designed and intuitively powerful, it helps you get more
            done, stress-free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="/login"
              variant="primary"
              size="md"
              className="font-semibold"
            >
              Start Your Journey
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
