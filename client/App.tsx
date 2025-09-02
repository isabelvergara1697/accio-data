import "./global.css";

import { createRoot } from "react-dom/client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DocumentLibrary from "./pages/DocumentLibrary";
import Resources from "./pages/Resources";
import InvitesAndOrders from "./pages/InvitesAndOrders";
import QuickCourtOrder from "./pages/QuickCourtOrder";
import QuickOrder from "./pages/QuickOrder";
import BatchOrders from "./pages/BatchOrders";
import I9Order from "./pages/I9Order";
import I9FormCompletion from "./pages/I9FormCompletion";
import I9OrderSubmission from "./pages/I9OrderSubmission";
import I9OrderConfirmation from "./pages/I9OrderConfirmation";
import OnlineOrdering from "./pages/OnlineOrdering";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import EmailSent from "./pages/EmailSent";
import SetNewPassword from "./pages/SetNewPassword";
import PasswordResetSuccess from "./pages/PasswordResetSuccess";
import ActivateAccount from "./pages/ActivateAccount";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<ActivateAccount />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/email-sent" element={<EmailSent />} />
          <Route path="/set-new-password" element={<SetNewPassword />} />
          <Route
            path="/password-reset-success"
            element={<PasswordResetSuccess />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/online-ordering" element={<OnlineOrdering />} />
          <Route path="/document-library" element={<DocumentLibrary />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/invites-orders" element={<InvitesAndOrders />} />
          <Route path="/quick-court-order" element={<QuickCourtOrder />} />
          <Route path="/quick-order" element={<QuickOrder />} />
          <Route path="/batch-orders" element={<BatchOrders />} />
          <Route path="/i9-order" element={<I9Order />} />
          <Route path="/i9-form-completion" element={<I9FormCompletion />} />
          <Route path="/i9-order-submission" element={<I9OrderSubmission />} />
          <Route
            path="/i9-order-confirmation"
            element={<I9OrderConfirmation />}
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

const container = document.getElementById("root")!;

// Prevent double root creation during development hot reloads
if (!container.hasAttribute("data-react-root")) {
  container.setAttribute("data-react-root", "true");
  const root = createRoot(container);
  root.render(<App />);
}
