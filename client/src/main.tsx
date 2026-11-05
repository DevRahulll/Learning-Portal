import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.js"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { TooltipProvider } from "./components/ui/tooltip.js"
import { Provider } from "react-redux"
import { store } from "./app/store.js"
import { Toaster } from "./components/ui/sonner"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <TooltipProvider>
        <ThemeProvider>
          <App />
          <Toaster />
        </ThemeProvider>
      </TooltipProvider>
    </Provider>
  </StrictMode>
)
