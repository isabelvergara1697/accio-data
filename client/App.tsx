import "./global.css";

import { createRoot } from "react-dom/client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import InvitesAndOrders from "./pages/InvitesAndOrders";
import OnlineOrdering from "./pages/OnlineOrdering";
import SubmitOrSaveOrder from "./pages/SubmitOrSaveOrder";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderDetails from "./pages/OrderDetails";
import Quickscreen from "./pages/Quickscreen";
import AdverseActionProcess from "./pages/AdverseActionProcess";
import { Reporting } from "./pages/Reporting";
import SearchResults from "./pages/SearchResults";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import EmailSent from "./pages/EmailSent";
import SetNewPassword from "./pages/SetNewPassword";
import PasswordResetSuccess from "./pages/PasswordResetSuccess";
import ActivateAccount from "./pages/ActivateAccount";
import CompanySettings from "./pages/CompanySettings";
import InviteNewMember from "./pages/InviteNewMember";
import InviteNewMemberValidation from "./pages/InviteNewMemberValidation";
import InviteNewMemberConfirmation from "./pages/InviteNewMemberConfirmation";
import EditMember from "./pages/EditMember";
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
          <Route path="/reporting" element={<Reporting />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/company-settings" element={<CompanySettings />} />
          <Route path="/invite-new-member" element={<InviteNewMember />} />
          <Route path="/edit-member" element={<EditMember />} />
          <Route
            path="/invite-new-member/validation"
            element={<InviteNewMemberValidation />}
          />
          <Route
            path="/invite-new-member/confirmation"
            element={<InviteNewMemberConfirmation />}
          />
          <Route path="/online-ordering" element={<OnlineOrdering />} />
          <Route path="/submit-order" element={<SubmitOrSaveOrder />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/invites-orders" element={<InvitesAndOrders />} />
          <Route path="/order-details/:orderId" element={<OrderDetails />} />
          <Route path="/orders-details/:orderId" element={<OrderDetails />} />
          <Route path="/quickscreen/:orderId" element={<Quickscreen />} />
          <Route
            path="/adverse-action-process/:orderId"
            element={<AdverseActionProcess />}
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
