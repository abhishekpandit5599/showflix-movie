import { createRoot } from "react-dom/client";
import App from "./App";

// Add custom styles for font families used in the design
const style = document.createElement('style');
style.textContent = `
  :root {
    --background: 0 0% 8%;
    --foreground: 0 0% 100%;
    --card: 0 0% 13%;
    --card-foreground: 0 0% 100%;
    --popover: 0 0% 13%;
    --popover-foreground: 0 0% 100%;
    --primary: 358 100% 48%;
    --primary-foreground: 0 0% 100%;
    --secondary: 0 0% 13%;
    --secondary-foreground: 0 0% 100%;
    --muted: 0 0% 20%;
    --muted-foreground: 0 0% 60%;
    --accent: 0 0% 34%;
    --accent-foreground: 0 0% 100%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;
    --border: 0 0% 20%;
    --input: 0 0% 20%;
    --ring: 358 100% 48%;
    --radius: 0.5rem;
  }

  body {
    font-family: 'Open Sans', sans-serif;
  }

  h1, h2, h3, h4, h5, h6, .font-heading {
    font-family: 'Roboto', sans-serif;
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
