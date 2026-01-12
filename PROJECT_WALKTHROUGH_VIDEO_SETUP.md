# Project Walkthrough Video Setup Guide

## Overview
A floating, draggable video player has been added to the home page to showcase the project walkthrough for employers. The video player is fully responsive, draggable, minimizable, and can be closed.

## Features
- ✅ **Floating & Draggable**: Can be repositioned anywhere on the screen
- ✅ **Minimizable**: Click the minimize button to collapse/expand
- ✅ **Closeable**: Click the X button to hide the video player
- ✅ **Responsive**: Adapts to mobile and desktop screens
- ✅ **Styled with Brand Colors**: Uses Soul Felt Music's burgundy/pink gradient
- ✅ **Bounded**: Cannot be dragged outside viewport
- ✅ **Auto-pause**: Video pauses when closed

## Files Created/Modified

### New File
- `frontend/src/components/ProjectWalkthroughVideo.jsx` - The floating video component

### Modified Files
- `frontend/src/pages/Home.jsx` - Added the video component to the home page

## Setup Instructions

### Option 1: Use a Self-Hosted Video File

1. **Add your video file** to the `frontend/public` directory:
   ```
   frontend/public/walkthrough-video.mp4
   ```

2. **Update the video source** in `ProjectWalkthroughVideo.jsx` (line ~105):
   ```jsx
   <video
     ref={videoRef}
     className="w-full h-full"
     controls
     poster="/walkthrough-thumbnail.jpg"  // Optional: Add a thumbnail
   >
     <source src="/walkthrough-video.mp4" type="video/mp4" />
     Your browser does not support the video tag.
   </video>
   ```

3. **Add a thumbnail** (optional) to `frontend/public/walkthrough-thumbnail.jpg`

### Option 2: Use YouTube Embed

1. **Upload your video** to YouTube

2. **Replace the video element** in `ProjectWalkthroughVideo.jsx` (lines ~103-114) with:
   ```jsx
   <iframe
     className="w-full h-full"
     src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
     title="Project Walkthrough"
     frameBorder="0"
     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
     allowFullScreen
   />
   ```

3. **Get your video ID** from the YouTube URL:
   - Example: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
   - Video ID: `dQw4w9WgXcQ`

### Option 3: Use Vimeo Embed

1. **Upload your video** to Vimeo

2. **Replace the video element** with:
   ```jsx
   <iframe
     className="w-full h-full"
     src="https://player.vimeo.com/video/YOUR_VIDEO_ID"
     title="Project Walkthrough"
     frameBorder="0"
     allow="autoplay; fullscreen; picture-in-picture"
     allowFullScreen
   />
   ```

## Customization Options

### Change Initial Position
Edit `useState` on line 8 of `ProjectWalkthroughVideo.jsx`:
```jsx
const [position, setPosition] = useState({ x: 20, y: 20 });
// Change x and y values (in pixels from top-left corner)
```

### Change Video Size
Edit the className on line 69:
```jsx
// Current: w-[90vw] max-w-[600px]
// Smaller: w-[80vw] max-w-[500px]
// Larger: w-[95vw] max-w-[800px]
```

### Start Minimized by Default
Edit line 6:
```jsx
const [isMinimized, setIsMinimized] = useState(true);
```

### Start Hidden (Show on User Action)
You could add a button to show/hide the video:
```jsx
const [isVisible, setIsVisible] = useState(false);
// Add a button somewhere: <button onClick={() => setIsVisible(true)}>Show Walkthrough</button>
```

### Customize Colors
The component uses your brand colors:
- Background: `#21212b` and `#1a1b22`
- Gradient header: `from-[#aa2a46] to-[#d63c65]`
- Text: `#fffced`

### Change Z-Index
If the video appears behind other elements, adjust line 69:
```jsx
className={`fixed z-[999] ...`}
// Increase to z-[1000] or higher if needed
```

## Usage Tips

### For Development
- The video appears immediately on the home page
- Test dragging, minimizing, and closing functionality
- Ensure video controls work properly

### For Production
1. **Optimize your video**:
   - Recommended format: MP4 (H.264 codec)
   - Recommended resolution: 1920x1080 or 1280x720
   - Keep file size under 50MB for faster loading
   - Use tools like HandBrake to compress

2. **Add analytics** (optional):
   ```jsx
   const handlePlay = () => {
     // Track video plays
     analytics.track('Walkthrough Video Played');
   };
   
   <video onPlay={handlePlay} ...>
   ```

3. **Consider autoplay** (muted):
   ```jsx
   <video autoPlay muted loop playsInline ...>
   ```
   Note: Most browsers require `muted` for autoplay

## Accessibility

The component includes:
- ✅ ARIA labels on buttons
- ✅ Keyboard-friendly controls (via native video controls)
- ✅ Clear visual indicators

## Browser Compatibility

Works on:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Video doesn't play
- Check video path is correct
- Ensure video format is MP4
- Check browser console for errors

### Video appears behind other elements
- Increase z-index in line 69
- Check if other components have higher z-index

### Dragging doesn't work on mobile
- Touch events need separate handling
- Consider disabling drag on mobile or using a library like `react-draggable`

### Performance issues
- Compress your video file
- Consider using YouTube/Vimeo instead
- Lazy load the video component

## Removing the Video

To temporarily hide the video, comment out the line in `Home.jsx`:
```jsx
// <ProjectWalkthroughVideo />
```

To permanently remove:
1. Delete `frontend/src/components/ProjectWalkthroughVideo.jsx`
2. Remove the import and component from `Home.jsx`

## Example Video Script Ideas

1. **Quick Overview** (30 seconds)
   - Show homepage and navigation
   - Demonstrate music browsing
   - Show cart and checkout

2. **Full Walkthrough** (2-3 minutes)
   - User authentication
   - Browse artists and albums
   - Play tracks
   - Add to cart and purchase
   - Show admin features (if applicable)

3. **Technical Overview** (for developers)
   - Show codebase structure
   - Demonstrate responsive design
   - Explain tech stack
   - Show backend API

## Next Steps

1. **Record your walkthrough video**
2. **Choose hosting method** (self-hosted, YouTube, or Vimeo)
3. **Add the video file or update the embed URL**
4. **Test on different screen sizes**
5. **Optimize video file size**
6. **Deploy and share with employers!**

---

**Created for Soul Felt Music Project**
Last Updated: November 2025
