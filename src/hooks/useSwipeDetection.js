import { useEffect, useRef, useState } from 'react';

const useSwipeDetection = (element, options = {}) => {
  const {
    minSwipeDistance = 50,
    maxSwipeDuration = 300,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onTap
  } = options;
  
  const [isSwiping, setIsSwiping] = useState(false);
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });
  const touchEndRef = useRef({ x: 0, y: 0, time: 0 });
  
  useEffect(() => {
    const targetElement = element?.current || document;
    
    const handleTouchStart = (e) => {
      setIsSwiping(true);
      
      const touch = e.touches[0];
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
      };
      
      touchEndRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
      };
    };
    
    const handleTouchMove = (e) => {
      if (!isSwiping) return;
      
      const touch = e.touches[0];
      touchEndRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
      };
    };
    
    const handleTouchEnd = (e) => {
      if (!isSwiping) return;
      
      const touchDuration = touchEndRef.current.time - touchStartRef.current.time;
      
      // Check if this is a tap (short touch with minimal movement)
      const touchDistance = Math.sqrt(
        Math.pow(touchEndRef.current.x - touchStartRef.current.x, 2) +
        Math.pow(touchEndRef.current.y - touchStartRef.current.y, 2)
      );
      
      if (touchDistance < 10 && touchDuration < 200 && onTap) {
        onTap(e);
      } else if (touchDuration <= maxSwipeDuration) {
        // Calculate swipe direction
        const deltaX = touchEndRef.current.x - touchStartRef.current.x;
        const deltaY = touchEndRef.current.y - touchStartRef.current.y;
        
        // Check if horizontal or vertical swipe based on which has larger distance
        const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
        
        if (isHorizontalSwipe) {
          // Horizontal swipe
          if (deltaX > minSwipeDistance && onSwipeRight) {
            onSwipeRight(e);
          } else if (deltaX < -minSwipeDistance && onSwipeLeft) {
            onSwipeLeft(e);
          }
        } else {
          // Vertical swipe
          if (deltaY > minSwipeDistance && onSwipeDown) {
            onSwipeDown(e);
          } else if (deltaY < -minSwipeDistance && onSwipeUp) {
            onSwipeUp(e);
          }
        }
      }
      
      setIsSwiping(false);
    };
    
    const handleTouchCancel = () => {
      setIsSwiping(false);
    };
    
    // Attach event listeners
    targetElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    targetElement.addEventListener('touchmove', handleTouchMove, { passive: true });
    targetElement.addEventListener('touchend', handleTouchEnd);
    targetElement.addEventListener('touchcancel', handleTouchCancel);
    
    // Clean up
    return () => {
      targetElement.removeEventListener('touchstart', handleTouchStart);
      targetElement.removeEventListener('touchmove', handleTouchMove);
      targetElement.removeEventListener('touchend', handleTouchEnd);
      targetElement.removeEventListener('touchcancel', handleTouchCancel);
    };
  }, [
    element,
    isSwiping,
    minSwipeDistance,
    maxSwipeDuration,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onTap
  ]);
  
  return {
    isSwiping,
  };
};

export default useSwipeDetection; 