import { useEffect, useState } from "react";
import { ChevronDown, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

const images = [
  "IMG_1539(3).png",
  "IMG_1538(3).png",
  "IMG_1537(3).png",
  "IMG_1540(3).png",
  "IMG_1536(3).png",
  "IMG_1535(3).png",
  "IMG_1532.jpeg",
  "IMG_1530(3).jpeg",
  "IMG_1529(3).jpeg",
  "IMG_1528(3).jpeg",
  "IMG_1527(3).jpeg",
  "IMG_1526(3).jpeg",
  "IMG_1525(3).jpeg",
  "IMG_1524(3).jpeg",
  "IMG_1523(3).jpeg",
  "IMG_1522(3).jpeg",
  "IMG_1521(3).jpeg",
  "IMG_1520(3).jpeg",
  "IMG_1519(3).jpeg",
  "IMG_1518(3).jpeg",
  "IMG_1517(3).jpeg",
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsAutoPlay(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero Section with Gallery */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Images with Parallax */}
        <div className="absolute inset-0 z-0">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{
                transform: `translateY(${scrollY * 0.5}px)`,
              }}
            >
              <img
                src={`/${img}`}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
            </div>
          ))}
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-accent drop-shadow-lg animate-fade-in">
            Fantasy Gallery
          </h1>
          <p className="text-xl md:text-2xl text-foreground/90 mb-8 drop-shadow-md animate-fade-in animation-delay-200">
            Explore a collection of stunning steampunk fantasy art
          </p>
          <Button
            onClick={() => {
              document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-3 text-lg"
          >
            Explore Gallery
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="w-8 h-8 text-accent" />
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="relative py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          {/* Main Image Display */}
          <div className="mb-12">
            <div className="relative w-full aspect-[3/4] md:aspect-[2/3] rounded-lg overflow-hidden shadow-2xl border-2 border-accent/30">
              <img
                src={`/${images[currentIndex]}`}
                alt={`Gallery ${currentIndex + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              {/* Image Counter */}
              <div className="absolute top-4 right-4 bg-black/60 text-accent px-4 py-2 rounded-full text-sm font-semibold">
                {currentIndex + 1} / {images.length}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <Button
              onClick={prevSlide}
              variant="outline"
              className="border-accent/50 text-accent hover:bg-accent/10"
            >
              ← Previous
            </Button>

            <Button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {isAutoPlay ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Play
                </>
              )}
            </Button>

            <Button
              onClick={nextSlide}
              variant="outline"
              className="border-accent/50 text-accent hover:bg-accent/10"
            >
              Next →
            </Button>
          </div>

          {/* Thumbnail Grid */}
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-300 border-2 ${
                  idx === currentIndex
                    ? "border-accent shadow-lg shadow-accent/50 scale-105"
                    : "border-accent/30 hover:border-accent/60 opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={`/${img}`}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-card/50 border-t border-accent/20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-accent text-center">About This Collection</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-accent">Steampunk Fantasy</h3>
              <p className="text-foreground/80 leading-relaxed">
                This collection showcases stunning AI-generated artwork featuring elaborate steampunk-inspired fantasy characters. Each image combines intricate details, rich colors, and imaginative costume design.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-accent">Interactive Experience</h3>
              <p className="text-foreground/80 leading-relaxed">
                Navigate through the gallery using the controls, auto-play feature, or by clicking on thumbnails. Each image is carefully crafted to deliver a visual experience with smooth transitions and elegant interactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-background border-t border-accent/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-foreground/60 mb-4">
            © 2024 Fantasy Gallery. All rights reserved.
          </p>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-accent hover:text-accent/80 transition-colors">
              Instagram
            </a>
            <a href="#" className="text-accent hover:text-accent/80 transition-colors">
              Twitter
            </a>
            <a href="#" className="text-accent hover:text-accent/80 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>

      {/* Custom Animations */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}

