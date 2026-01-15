import React, { useState, useEffect } from 'react';

function ImageLoader({ src, alt, className, imageClassName, onClick }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoading(false);
    };

    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return (
    <div className={className}>
      {isLoading && (
        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] bg-warmgrey-100 rounded-lg sm:rounded-xl flex items-center justify-center animate-pulse">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-warmgrey-200 border-t-sand-500 rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm text-warmgrey-500">Loading image...</p>
          </div>
        </div>
      )}
      {hasError && (
        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] bg-warmgrey-100 rounded-lg sm:rounded-xl flex items-center justify-center">
          <div className="text-center">
            <p className="text-warmgrey-900 font-semibold">Failed to load image</p>
            <p className="text-sm text-warmgrey-600 mt-2">Please check your connection</p>
          </div>
        </div>
      )}
      {!isLoading && !hasError && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={imageClassName}
          onClick={onClick}
        />
      )}
    </div>
  );
}

export default ImageLoader;