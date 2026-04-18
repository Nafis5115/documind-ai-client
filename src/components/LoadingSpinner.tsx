import FancySpinner from "./ui/fancy-spinner";

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center animate-fade-in-fast">
      {/* Backdrop */}
      <div className="absolute inset-0 backdrop-blur-2xl bg-background/70" />

      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float" />
      <div
        className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-accent/20 rounded-full blur-[100px] animate-float"
        style={{ animationDelay: "1.5s" }}
      />

      {/* Spinner card */}
      <div className="relative glass-strong rounded-3xl px-10 py-8 animate-scale-in">
        <FancySpinner size="xl" />
      </div>
    </div>
  );
}
