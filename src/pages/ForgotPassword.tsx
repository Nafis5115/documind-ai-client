import { ArrowLeft, ArrowRight, FileText, Mail } from "lucide-react";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

type ForgotPasswordFormData = {
  email: string;
};

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleForgotPassword = async (data: ForgotPasswordFormData) => {
    try {
      await resetPassword(data.email);
      toast.success("Successfully Sent Password Reset Email.");
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-float" />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px] animate-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative w-full max-w-md">
        <Link to={"/login"} className="flex text-muted-foreground my-4">
          <ArrowLeft></ArrowLeft>
          Back
        </Link>
        {/* Card */}

        <div className="glass-strong rounded-3xl p-8 space-y-6">
          <form
            onSubmit={handleSubmit(handleForgotPassword)}
            className="space-y-4"
          >
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

            <button
              type="submit"
              // disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl gradient-bg-primary text-primary-foreground font-medium text-sm glow-blue hover:opacity-90 transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Submit
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
