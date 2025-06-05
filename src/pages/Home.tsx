
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Star, User, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">BookClub</h1>
            </div>
            <div className="flex space-x-4">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 sm:text-6xl">
            Discover Your Next
            <span className="text-indigo-600"> Great Read</span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Build your personal library, share reviews with fellow readers, and discover books through our vibrant community of book lovers.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/signup">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                Get Started
              </Button>
            </Link>
            <Link to="/browse">
              <Button variant="outline" size="lg">
                Browse Books
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <BookOpen className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Personal Library</CardTitle>
                <CardDescription>
                  Organize your books by reading status and keep track of your literary journey.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Star className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Reviews & Ratings</CardTitle>
                <CardDescription>
                  Share your thoughts and discover what others think about your favorite books.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <User className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Book Community</CardTitle>
                <CardDescription>
                  Connect with fellow readers and get personalized book recommendations.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Public Feed Preview */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Latest Community Reviews
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample reviews */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">JS</span>
                  </div>
                  <div>
                    <p className="font-semibold">Jane Smith</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold">The Silent Patient</h4>
                <p className="text-sm text-gray-600 mb-2">by Alex Michaelides</p>
                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700">
                  "A psychological thriller that kept me guessing until the very end..."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">MD</span>
                  </div>
                  <div>
                    <p className="font-semibold">Mike Davis</p>
                    <p className="text-sm text-gray-500">5 hours ago</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold">Atomic Habits</h4>
                <p className="text-sm text-gray-600 mb-2">by James Clear</p>
                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <Star className="h-4 w-4 text-gray-300" />
                </div>
                <p className="text-sm text-gray-700">
                  "Practical and actionable advice for building better habits..."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">AL</span>
                  </div>
                  <div>
                    <p className="font-semibold">Alice Johnson</p>
                    <p className="text-sm text-gray-500">1 day ago</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold">The Seven Husbands of Evelyn Hugo</h4>
                <p className="text-sm text-gray-600 mb-2">by Taylor Jenkins Reid</p>
                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700">
                  "An absolutely captivating story that I couldn't put down..."
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/browse">
              <Button variant="outline">
                <Search className="mr-2 h-4 w-4" />
                Explore More Reviews
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 BookClub. Built for book lovers, by book lovers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
