
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Star, User, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [minRating, setMinRating] = useState(0);

  // Sample data - this would come from your database
  const sampleBooks = [
    {
      id: 1,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      coverUrl: "/placeholder.svg",
      avgRating: 4.2,
      reviewCount: 15,
      tags: ["thriller", "psychology", "mystery"],
      recentReviews: [
        { user: "Jane Smith", rating: 5, text: "Absolutely gripping psychological thriller..." },
        { user: "Mike Davis", rating: 4, text: "Great plot twist at the end..." }
      ]
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      coverUrl: "/placeholder.svg",
      avgRating: 4.6,
      reviewCount: 23,
      tags: ["self-help", "productivity", "habits"],
      recentReviews: [
        { user: "Alice Johnson", rating: 5, text: "Life-changing book about building better habits..." },
        { user: "Bob Wilson", rating: 4, text: "Practical advice that actually works..." }
      ]
    },
    {
      id: 3,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      coverUrl: "/placeholder.svg",
      avgRating: 4.8,
      reviewCount: 31,
      tags: ["fiction", "romance", "hollywood"],
      recentReviews: [
        { user: "Sarah Brown", rating: 5, text: "Couldn't put this book down!" },
        { user: "Tom Green", rating: 5, text: "Beautifully written story..." }
      ]
    }
  ];

  const allTags = ["thriller", "psychology", "mystery", "self-help", "productivity", "habits", "fiction", "romance", "hollywood"];

  const filteredBooks = sampleBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || book.tags.includes(selectedTag);
    const matchesRating = book.avgRating >= minRating;
    
    return matchesSearch && matchesTag && matchesRating;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">BookClub</h1>
            </Link>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse Books & Reviews</h2>
          <p className="text-gray-600">Discover what the community is reading and sharing</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Search Books</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by title or author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Tag Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Filter by Tag</label>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Minimum Rating</label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={0}>Any Rating</option>
                <option value={3}>3+ Stars</option>
                <option value={4}>4+ Stars</option>
                <option value={4.5}>4.5+ Stars</option>
              </select>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredBooks.map(book => (
            <Card key={book.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <img 
                    src={book.coverUrl} 
                    alt={book.title}
                    className="w-20 h-28 object-cover rounded-md bg-gray-200"
                  />
                  <div className="flex-1">
                    <CardTitle className="text-lg">{book.title}</CardTitle>
                    <p className="text-gray-600 mb-2">by {book.author}</p>
                    
                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`h-4 w-4 ${star <= book.avgRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {book.avgRating.toFixed(1)} ({book.reviewCount} reviews)
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {book.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Recent Reviews</h4>
                  {book.recentReviews.slice(0, 2).map((review, index) => (
                    <div key={index} className="border-l-4 border-indigo-200 pl-4">
                      <div className="flex items-center space-x-2 mb-1">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium">{review.user}</span>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`h-3 w-3 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{review.text}</p>
                    </div>
                  ))}
                  
                  <Button variant="outline" size="sm" className="w-full">
                    View All Reviews
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or browse all books.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
