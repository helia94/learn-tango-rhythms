import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

const Auth: React.FC = () => {
  const { user, signIn, signUp, loading } = useAuth();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already authenticated
  if (user && !loading) {
    return <Navigate to="/" replace />;
  }

  const handleBack = () => {
    // Check if we can go back in history, otherwise go to home
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password, {
          username: username || undefined,
          full_name: fullName || undefined,
        });

        if (error) {
          if (error.message.includes('already registered')) {
            toast.error('This email is already registered. Please sign in instead.');
          } else {
            toast.error(error.message || 'Failed to create account');
          }
        } else {
          toast.success('Account created successfully! Please check your email to verify your account.');
          // Clear form
          setEmail('');
          setPassword('');
          setUsername('');
          setFullName('');
        }
      } else {
        const { error } = await signIn(email, password);

        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast.error('Invalid email or password. Please try again.');
          } else {
            toast.error(error.message || 'Failed to sign in');
          }
        } else {
          toast.success('Welcome back!');
        }
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setEmail('');
    setPassword('');
    setUsername('');
    setFullName('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream via-sandy-beige to-warm-brown">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-terracotta border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream via-sandy-beige to-warm-brown p-4">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 inline-flex items-center gap-2 text-warm-brown bg-cream/80 px-4 py-2 rounded-full hover:bg-cream transition-all duration-300 shadow-lg backdrop-blur-sm z-10"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <Card className="w-full max-w-md p-8 bg-white/90 backdrop-blur-sm border-0 shadow-2xl rounded-organic">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display text-warm-brown mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-mushroom">
            {isSignUp ? 'Join our rhythm community' : 'Sign in to continue your journey'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {isSignUp && (
            <>
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-warm-brown font-medium">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="border-sage-green/30 focus:border-terracotta focus:ring-terracotta/20"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="text-warm-brown font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border-sage-green/30 focus:border-terracotta focus:ring-terracotta/20"
                  placeholder="Choose a username"
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-warm-brown font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-sage-green/30 focus:border-terracotta focus:ring-terracotta/20"
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-warm-brown font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="border-sage-green/30 focus:border-terracotta focus:ring-terracotta/20"
              placeholder="Enter your password"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-terracotta hover:bg-burnt-orange text-white font-medium py-3 rounded-organic transition-all duration-300 hover:shadow-lg disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                {isSignUp ? 'Creating Account...' : 'Signing In...'}
              </div>
            ) : (
              isSignUp ? 'Create Account' : 'Sign In'
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={toggleMode}
            className="text-sage-green hover:text-deep-teal transition-colors duration-200 font-medium"
          >
            {isSignUp 
              ? 'Already have an account? Sign in' 
              : "Don't have an account? Sign up"
            }
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Auth;
