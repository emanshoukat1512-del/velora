import React from 'react';
import { Button } from '../components/common/Button';
import { Compass, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#061321] text-white flex items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#18C8D8]/10 border border-[#18C8D8]/30 flex items-center justify-center text-[#18C8D8] mx-auto animate-pulse">
          <Compass className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs uppercase tracking-widest text-[#D9A441] font-bold">
            Navigation Disconnect • 404
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            Lost in the Stratosphere
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
            The coordinate path you requested does not exist or has been relocated to another orbital sector.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Button to="/" variant="primary" size="md" icon={<Home className="w-4 h-4" />}>
            Return Home
          </Button>
          <Button to="/destinations" variant="outline" size="md">
            Browse Destinations
          </Button>
        </div>
      </div>
    </div>
  );
};
