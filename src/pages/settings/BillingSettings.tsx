import { CreditCard, Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    features: ["5 documents", "50 queries/month", "Basic AI"],
    current: false,
  },
  {
    name: "Pro",
    price: "$19",
    features: [
      "Unlimited documents",
      "Unlimited queries",
      "Advanced AI",
      "Priority support",
    ],
    current: true,
  },
  {
    name: "Enterprise",
    price: "$49",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "SSO & SAML",
      "Dedicated support",
    ],
    current: false,
  },
];

const BillingSettings = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6">
      <div className="animate-fade-in">
        <button
          onClick={onBack}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          ← Back to Settings
        </button>
        <h1 className="text-2xl font-bold text-foreground">Billing</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your subscription and payment
        </p>
      </div>

      {/* Current plan */}
      <div
        className="glass-subtle rounded-2xl p-6 animate-fade-in"
        style={{ animationDelay: "0.1s" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Pro Plan</h3>
            <p className="text-sm text-muted-foreground">
              $19/month • Renews Apr 15, 2026
            </p>
          </div>
          <span className="px-3 py-1 rounded-full gradient-bg-primary text-primary-foreground text-xs font-medium">
            Active
          </span>
        </div>
        <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
          <div className="h-full w-3/4 gradient-bg-primary rounded-full" />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          750 / 1,000 queries used this month
        </p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {plans.map((plan, i) => (
          <div
            key={plan.name}
            className={`glass-subtle rounded-2xl p-5 space-y-4 animate-fade-in transition-all hover:scale-[1.02] ${plan.current ? "ring-2 ring-primary glow-blue" : ""}`}
            style={{ animationDelay: `${0.2 + i * 0.1}s` }}
          >
            <div>
              <h3 className="text-base font-semibold text-foreground">
                {plan.name}
              </h3>
              <p className="text-2xl font-bold text-foreground mt-1">
                {plan.price}
                <span className="text-sm font-normal text-muted-foreground">
                  /mo
                </span>
              </p>
            </div>
            <ul className="space-y-2">
              {plan.features.map((f) => (
                <li
                  key={f}
                  className="text-xs text-muted-foreground flex items-center gap-2"
                >
                  <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />{" "}
                  {f}
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all active:scale-[0.98] ${plan.current ? "bg-muted/50 text-muted-foreground cursor-default" : "gradient-bg-primary text-primary-foreground glow-blue hover:opacity-90"}`}
              disabled={plan.current}
            >
              {plan.current ? "Current Plan" : "Upgrade"}
            </button>
          </div>
        ))}
      </div>

      {/* Payment method */}
      <div
        className="glass-subtle rounded-2xl p-6 animate-fade-in"
        style={{ animationDelay: "0.5s" }}
      >
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-primary" /> Payment Method
        </h3>
        <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-7 rounded bg-muted/60 flex items-center justify-center text-xs font-bold text-foreground">
              VISA
            </div>
            <div>
              <p className="text-sm text-foreground">•••• •••• •••• 4242</p>
              <p className="text-xs text-muted-foreground">Expires 12/27</p>
            </div>
          </div>
          <button className="text-xs text-primary hover:underline">
            Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingSettings;
