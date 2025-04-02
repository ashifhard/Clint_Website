export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white text-center py-6 px-4 relative">
      {/* Social Links */}
      <div className="flex flex-wrap justify-center gap-4 lg:space-x-6 mb-4">
        <a 
          href="https://www.facebook.com/Niitujagroup07" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-blue-300 transition-colors"
        >
          Facebook
        </a>
        <a 
          href="https://twitter.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-blue-300 transition-colors"
        >
          Twitter
        </a>
        <a 
          href="https://www.instagram.com/niituja_group_07/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-blue-300 transition-colors"
        >
          Instagram
        </a>
        <a
          href="https://www.linkedin.com/in/niituja-educational-and-welfare-foundation-2a7b3a33a/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-blue-300 transition-colors"
        >
          LinkedIn
        </a>
        <a 
          href="https://youtube.com/@niitujagroup07?si=pYeGRssqOPu_6O-K" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-blue-300 transition-colors"
        >
          YouTube
        </a>
      </div>

      {/* Contact Information */}
      <div className="mt-4 text-base lg:text-lg">
        <p>
          Contact Us: <a href="tel:918809922772" className="text-white hover:text-blue-400 transition-colors">+91 8809922772</a>
        </p>
      </div>

      {/* Copyright */}
      <p className="text-sm lg:text-base mt-2">
        &copy; 25 NOV 2024 NIITUJA EDUCATIONAL & WELFARE FOUNDATION. All rights reserved.
      </p>

      {/* Developer Credit (Subtle, non-interactive) */}
      <div className="absolute bottom-2 right-3">
        <span className="text-[0.65rem] opacity-60 font-mono tracking-tight">
          developed by Ashif Raza
        </span>
      </div>
    </footer>
  );
}