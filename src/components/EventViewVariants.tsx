
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, AlertTriangle, CheckCircle, Info, Zap, Globe, Shield, Database } from "lucide-react";

interface EventViewVariantsProps {
  events: any[];
  variant: string;
}

export const EventViewVariants = ({ events, variant }: EventViewVariantsProps) => {
  const getVariantStyles = (variantName: string) => {
    const variants = {
      // Design 1: Minimalist Cards
      "minimal": {
        layout: "grid",
        cardStyle: "border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow",
        headerStyle: "text-lg font-semibold text-gray-900 mb-2",
        statusStyle: "inline-flex px-2 py-1 text-xs font-medium rounded-full",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      },
      // Design 2: Timeline Style
      "timeline": {
        layout: "timeline",
        cardStyle: "border-l-4 border-blue-500 pl-4 py-3 bg-blue-50 mb-4",
        headerStyle: "text-xl font-bold text-blue-900 mb-1",
        statusStyle: "bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm",
        containerStyle: "space-y-4 max-w-4xl mx-auto"
      },
      // Design 3: Glassmorphism
      "glass": {
        layout: "grid",
        cardStyle: "backdrop-blur-lg bg-white/20 border border-white/30 rounded-xl p-6 shadow-xl",
        headerStyle: "text-lg font-bold text-gray-800 mb-3",
        statusStyle: "bg-white/30 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-medium",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-br from-purple-400 to-blue-500 p-8 rounded-2xl"
      },
      // Design 4: Neon Dark
      "neon": {
        layout: "grid",
        cardStyle: "bg-gray-900 border border-cyan-400 rounded-lg p-4 shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40 transition-shadow",
        headerStyle: "text-lg font-bold text-cyan-300 mb-2",
        statusStyle: "border border-cyan-400 text-cyan-300 px-3 py-1 rounded-full text-sm bg-gray-800",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-950 p-6 rounded-xl"
      },
      // Design 5: Newspaper Style
      "newspaper": {
        layout: "masonry",
        cardStyle: "border-2 border-black bg-white p-4 mb-4 transform rotate-1 hover:rotate-0 transition-transform shadow-lg",
        headerStyle: "font-bold text-xl text-black mb-2 font-serif",
        statusStyle: "bg-black text-white px-2 py-1 text-xs font-bold uppercase tracking-wide",
        containerStyle: "columns-1 md:columns-2 lg:columns-3 gap-6"
      },
      // Design 6: Material Design
      "material": {
        layout: "grid",
        cardStyle: "bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden",
        headerStyle: "text-lg font-medium text-gray-900 mb-2 px-4 pt-4",
        statusStyle: "bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      },
      // Design 7: Retro Gaming
      "retro": {
        layout: "grid",
        cardStyle: "bg-yellow-300 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow",
        headerStyle: "text-lg font-bold text-black mb-2 font-mono",
        statusStyle: "bg-black text-yellow-300 px-3 py-1 font-mono text-sm border-2 border-black",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 gap-4 bg-pink-400 p-6"
      },
      // Design 8: Corporate Professional
      "corporate": {
        layout: "list",
        cardStyle: "bg-slate-50 border-l-4 border-slate-600 p-6 mb-2 hover:bg-slate-100 transition-colors",
        headerStyle: "text-xl font-semibold text-slate-800 mb-3",
        statusStyle: "bg-slate-600 text-white px-4 py-2 rounded text-sm font-medium",
        containerStyle: "space-y-2 max-w-6xl mx-auto"
      },
      // Design 9: Pastel Soft
      "pastel": {
        layout: "grid",
        cardStyle: "bg-gradient-to-br from-pink-100 to-purple-100 border border-pink-200 rounded-2xl p-5 shadow-sm",
        headerStyle: "text-lg font-semibold text-purple-800 mb-2",
        statusStyle: "bg-white/70 text-purple-700 px-3 py-1 rounded-full text-sm backdrop-blur-sm",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      },
      // Design 10: Industrial
      "industrial": {
        layout: "grid",
        cardStyle: "bg-gray-800 border border-orange-500 p-4 relative before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-orange-500",
        headerStyle: "text-lg font-bold text-orange-300 mb-2 font-mono",
        statusStyle: "bg-orange-500 text-black px-3 py-1 font-bold text-sm",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-900 p-6"
      },
      // Design 11: Art Deco
      "artdeco": {
        layout: "grid",
        cardStyle: "bg-gradient-to-b from-gold-100 to-gold-200 border-2 border-gold-400 p-6 clip-path-polygon",
        headerStyle: "text-xl font-bold text-gold-900 mb-3 text-center",
        statusStyle: "bg-gold-600 text-white px-4 py-2 text-sm font-bold tracking-wide",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 gap-6"
      },
      // Design 12: Cyberpunk
      "cyberpunk": {
        layout: "grid",
        cardStyle: "bg-black border border-green-400 p-4 relative before:absolute before:inset-0 before:bg-green-400/10 before:animate-pulse",
        headerStyle: "text-lg font-bold text-green-300 mb-2 font-mono tracking-wider",
        statusStyle: "border border-green-400 text-green-300 px-3 py-1 bg-black/80 text-sm font-mono",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-950"
      },
      // Design 13: Watercolor
      "watercolor": {
        layout: "masonry",
        cardStyle: "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-0 rounded-3xl p-6 shadow-lg",
        headerStyle: "text-lg font-medium text-purple-800 mb-3",
        statusStyle: "bg-white/80 text-purple-700 px-4 py-2 rounded-full text-sm backdrop-blur-sm",
        containerStyle: "columns-1 md:columns-2 lg:columns-3 gap-8"
      },
      // Design 14: Monospace Terminal
      "terminal": {
        layout: "list",
        cardStyle: "bg-black border border-green-500 p-4 font-mono text-green-400 mb-2",
        headerStyle: "text-lg font-bold text-green-300 mb-2 before:content-['$_'] before:text-green-500",
        statusStyle: "text-green-400 px-2 py-1 border border-green-500 text-sm bg-gray-900",
        containerStyle: "space-y-2 bg-black p-6 rounded-lg max-w-4xl mx-auto"
      },
      // Design 15: Vintage Paper
      "vintage": {
        layout: "grid",
        cardStyle: "bg-amber-50 border border-amber-200 p-5 shadow-md relative before:absolute before:inset-0 before:bg-amber-100/30",
        headerStyle: "text-lg font-serif font-bold text-amber-900 mb-3",
        statusStyle: "bg-amber-600 text-white px-3 py-1 text-sm font-serif",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 gap-6"
      },
      // Design 16: Geometric Modern
      "geometric": {
        layout: "grid",
        cardStyle: "bg-white border-0 p-6 relative before:absolute before:top-0 before:left-0 before:w-4 before:h-full before:bg-gradient-to-b before:from-blue-500 before:to-purple-500",
        headerStyle: "text-lg font-bold text-gray-800 mb-2 ml-6",
        statusStyle: "bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 text-sm font-medium",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      },
      // Design 17: Glassmorphism Dark
      "glassdark": {
        layout: "grid",
        cardStyle: "backdrop-blur-lg bg-gray-900/60 border border-gray-700/50 rounded-2xl p-6 shadow-2xl",
        headerStyle: "text-lg font-bold text-white mb-3",
        statusStyle: "bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm border border-white/30",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl"
      },
      // Design 18: Rainbow Gradient
      "rainbow": {
        layout: "grid",
        cardStyle: "bg-gradient-to-br from-red-100 via-yellow-100 via-green-100 via-blue-100 to-purple-100 border-0 rounded-xl p-5 shadow-lg",
        headerStyle: "text-lg font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent mb-2",
        statusStyle: "bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      },
      // Design 19: Brutalist
      "brutalist": {
        layout: "grid",
        cardStyle: "bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
        headerStyle: "text-2xl font-black text-black mb-3 uppercase tracking-tight",
        statusStyle: "bg-black text-white px-4 py-2 font-black text-sm uppercase",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 gap-8"
      },
      // Design 20: Gradient Mesh
      "mesh": {
        layout: "grid",
        cardStyle: "bg-gradient-to-br from-indigo-100 via-purple-50 to-teal-100 border border-white/50 rounded-2xl p-6 backdrop-blur-sm",
        headerStyle: "text-lg font-semibold text-gray-800 mb-3",
        statusStyle: "bg-white/70 border border-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm backdrop-blur-sm",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 rounded-3xl"
      }
    };

    return variants[variantName] || variants.minimal;
  };

  const styles = getVariantStyles(variant);

  const renderEvent = (event: any, index: number) => {
    const statusColor = event.status === 'resolved' ? 'text-green-600' : 
                       event.status === 'investigating' ? 'text-yellow-600' : 'text-red-600';

    return (
      <div key={event.id} className={styles.cardStyle}>
        <div className={styles.headerStyle}>
          {event.title}
        </div>
        <div className="flex items-center space-x-2 mb-3">
          <Badge className={styles.statusStyle}>
            {event.eventType}
          </Badge>
          <Badge variant="outline" className={statusColor}>
            {event.status}
          </Badge>
        </div>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {event.description}
        </p>
        <div className="flex items-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{new Date(event.fromTimestamp).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{new Date(event.fromTimestamp).toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.containerStyle}>
      {events.map((event, index) => renderEvent(event, index))}
    </div>
  );
};
