import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 border-b border-border/20 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gradient flex items-center justify-center gap-3">
              <span className="text-4xl md:text-5xl animate-bounce">🚀</span>
              MarketForge AI
            </h1>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
              Transform your product ideas into complete marketing campaigns
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;