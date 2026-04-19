import { useState } from "react";
import {
  FileText,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  User,
  CloudFog,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";
import useAxiosSecure from "../hooks/useAxiosSecure";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const { registerUser, updateUser, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const handleRegister = async (data: RegisterFormData) => {
    try {
      const result = await registerUser(data.email, data.password);
      await updateUser({
        displayName: data.name,
      });

      await axiosSecure
        .post("/create-user", {
          name: result.user?.displayName,
          email: result.user?.email,
        })
        .then(() => console.log("user save to db"))
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-float" />
      <div
        className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[100px] animate-float"
        style={{ animationDelay: "3s" }}
      />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl gradient-bg-primary flex items-center justify-center glow-blue">
            <FileText className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold gradient-text">DocuMind AI</h1>
        </div>

        {/* Card */}
        <div className="glass-strong rounded-3xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              Create your account
            </h2>
            <p className="text-muted-foreground text-sm">
              Start analyzing documents with AI
            </p>
          </div>

          <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Full Name
              </label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="Enter your name"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/40 border border-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-300 focus:bg-muted/60 focus:border-primary/40 focus:shadow-[0_0_20px_hsla(var(--neon-blue)/0.15)]"
                />
              </div>
              {errors.name?.type === "required" && (
                <span className="text-sm text-red-500">Name is required</span>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/40 border border-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-300 focus:bg-muted/60 focus:border-primary/40 focus:shadow-[0_0_20px_hsla(var(--neon-blue)/0.15)]"
                />
              </div>
              {errors.email?.type === "required" && (
                <span className="text-sm text-red-500">Email is required</span>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <input
                  {...register("password", { required: true, minLength: 6 })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-muted/40 border border-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-300 focus:bg-muted/60 focus:border-primary/40 focus:shadow-[0_0_20px_hsla(var(--neon-blue)/0.15)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password?.type === "required" && (
                <span className="text-sm text-red-500">
                  Password is required
                </span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-sm text-red-500">
                  Password must be 6 characters
                </span>
              )}
            </div>

            {/* <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Confirm Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Repeat your password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/40 border border-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-300 focus:bg-muted/60 focus:border-primary/40 focus:shadow-[0_0_20px_hsla(var(--neon-blue)/0.15)]"
                />
              </div>
            </div> */}

            {/* <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-border accent-primary"
              />
              <span className="text-sm text-muted-foreground">
                I agree to the{" "}
                <button
                  type="button"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  Privacy Policy
                </button>
              </span>
            </label> */}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl gradient-bg-primary text-primary-foreground font-medium text-sm glow-blue hover:opacity-90 transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Create Account
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Login link */}
        <p className="text-center mt-6 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
