import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-4xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-3 text-muted-foreground">The page you’re looking for doesn’t exist or has been moved.</p>
      <a href="/" className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-primary-foreground text-sm font-medium hover:bg-primary/90">Return home</a>
    </div>
  );
};

export default NotFound;
