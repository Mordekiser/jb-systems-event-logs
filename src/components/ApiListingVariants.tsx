
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, Database, Globe, Server, Shield, Zap, CheckCircle, AlertTriangle } from "lucide-react";

interface ApiListingVariantsProps {
  apis: any[];
  variant: string;
}

export const ApiListingVariants = ({ apis, variant }: ApiListingVariantsProps) => {
  const getVariantStyles = (variantName: string) => {
    const variants = {
      // Design 1: Developer Console
      "console": {
        layout: "console",
        cardStyle: "bg-gray-900 text-green-400 p-4 font-mono border border-green-500 rounded",
        headerStyle: "text-lg font-bold text-green-300 mb-2 before:content-['API:_']",
        statusStyle: "border border-green-400 text-green-300 px-2 py-1 text-xs bg-gray-800",
        containerStyle: "space-y-4 bg-black p-6 rounded-lg"
      },
      // Design 2: Modern Cards
      "modern": {
        layout: "cards",
        cardStyle: "bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border",
        headerStyle: "text-xl font-semibold text-gray-800 mb-3",
        statusStyle: "px-3 py-1 rounded-full text-sm font-medium",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      },
      // Design 3: API Documentation Style
      "docs": {
        layout: "documentation",
        cardStyle: "bg-white border-l-4 border-blue-500 p-6 shadow-sm hover:shadow-md transition-shadow",
        headerStyle: "text-lg font-mono font-bold text-blue-800 mb-2",
        statusStyle: "bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-mono",
        containerStyle: "space-y-4"
      },
      // Design 4: Postman Style
      "postman": {
        layout: "postman",
        cardStyle: "bg-orange-50 border border-orange-200 rounded-lg p-5 hover:bg-orange-100 transition-colors",
        headerStyle: "text-lg font-semibold text-orange-800 mb-2",
        statusStyle: "bg-orange-500 text-white px-3 py-1 rounded text-sm font-bold",
        containerStyle: "space-y-3"
      },
      // Design 5: Swagger Style
      "swagger": {
        layout: "swagger",
        cardStyle: "bg-green-50 border border-green-200 rounded p-4 hover:bg-green-100 transition-colors",
        headerStyle: "text-md font-mono font-semibold text-green-800 mb-2",
        statusStyle: "bg-green-600 text-white px-2 py-1 rounded text-xs font-mono",
        containerStyle: "space-y-2"
      },
      // Design 6: GraphQL Style
      "graphql": {
        layout: "graphql",
        cardStyle: "bg-purple-50 border border-purple-200 rounded-lg p-5 hover:bg-purple-100 transition-colors",
        headerStyle: "text-lg font-bold text-purple-800 mb-3",
        statusStyle: "bg-purple-600 text-white px-3 py-1 rounded-full text-sm",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 gap-4"
      },
      // Design 7: REST API Style
      "rest": {
        layout: "rest",
        cardStyle: "bg-blue-50 border border-blue-200 rounded p-4 hover:bg-blue-100 transition-colors",
        headerStyle: "text-md font-semibold text-blue-800 mb-2",
        statusStyle: "bg-blue-500 text-white px-2 py-1 rounded text-xs",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"
      },
      // Design 8: Microservices
      "microservices": {
        layout: "microservices",
        cardStyle: "bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow",
        headerStyle: "text-lg font-medium text-gray-800 mb-2",
        statusStyle: "px-3 py-1 rounded text-sm font-medium",
        containerStyle: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"
      },
      // Design 9: Enterprise
      "enterprise": {
        layout: "enterprise",
        cardStyle: "bg-slate-50 border-l-4 border-slate-600 p-6 hover:bg-slate-100 transition-colors",
        headerStyle: "text-xl font-semibold text-slate-800 mb-3",
        statusStyle: "bg-slate-600 text-white px-4 py-2 rounded text-sm font-medium",
        containerStyle: "space-y-4"
      },
      // Design 10: Minimal List
      "minimal": {
        layout: "minimal",
        cardStyle: "bg-white border border-gray-100 p-4 hover:border-gray-200 transition-colors",
        headerStyle: "text-lg font-medium text-gray-900 mb-2",
        statusStyle: "text-gray-600 bg-gray-100 px-3 py-1 rounded text-sm",
        containerStyle: "space-y-2"
      },
      // Design 11-20: Additional unique designs
      "terminal": {
        layout: "terminal",
        cardStyle: "bg-black text-green-400 p-4 font-mono border border-green-500",
        headerStyle: "text-lg font-bold mb-2 before:content-['[API]_'] before:text-yellow-400",
        statusStyle: "text-green-400 px-2 py-1 border border-green-500 text-sm bg-gray-900",
        containerStyle: "space-y-2 bg-black p-6 rounded-lg"
      },
      "neon": {
        layout: "neon",
        cardStyle: "bg-gray-900 border border-cyan-400 p-4 shadow-lg shadow-cyan-400/20 rounded-lg",
        headerStyle: "text-lg font-bold text-cyan-300 mb-2",
        statusStyle: "border border-cyan-400 text-cyan-300 px-3 py-1 rounded-full text-sm bg-gray-800",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-950 p-6 rounded-xl"
      },
      "retro": {
        layout: "retro",
        cardStyle: "bg-yellow-300 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        headerStyle: "text-lg font-bold text-black mb-2 font-mono",
        statusStyle: "bg-black text-yellow-300 px-3 py-1 font-mono text-sm",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 gap-4 bg-pink-400 p-6"
      },
      "glass": {
        layout: "glass",
        cardStyle: "backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6 shadow-xl",
        headerStyle: "text-lg font-bold text-white mb-3",
        statusStyle: "bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-br from-blue-500 to-purple-500 p-8 rounded-2xl"
      },
      "brutalist": {
        layout: "brutalist",
        cardStyle: "bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
        headerStyle: "text-2xl font-black text-black mb-3 uppercase",
        statusStyle: "bg-black text-white px-4 py-2 font-black text-sm uppercase",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 gap-8"
      },
      "vintage": {
        layout: "vintage",
        cardStyle: "bg-amber-50 border-2 border-amber-200 p-5 shadow-md rounded",
        headerStyle: "text-lg font-serif font-bold text-amber-900 mb-3",
        statusStyle: "bg-amber-600 text-white px-3 py-1 text-sm font-serif rounded",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 gap-6"
      },
      "cyberpunk": {
        layout: "cyberpunk",
        cardStyle: "bg-black border border-green-400 p-4 relative before:absolute before:inset-0 before:bg-green-400/10",
        headerStyle: "text-lg font-bold text-green-300 mb-2 font-mono tracking-wider",
        statusStyle: "border border-green-400 text-green-300 px-3 py-1 bg-black/80 text-sm font-mono",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-950 p-6"
      },
      "watercolor": {
        layout: "watercolor",
        cardStyle: "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-6 shadow-lg",
        headerStyle: "text-lg font-medium text-purple-800 mb-3",
        statusStyle: "bg-white/80 text-purple-700 px-4 py-2 rounded-full text-sm backdrop-blur-sm",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 gap-6"
      },
      "geometric": {
        layout: "geometric",
        cardStyle: "bg-white p-6 relative before:absolute before:top-0 before:left-0 before:w-4 before:h-full before:bg-gradient-to-b before:from-blue-500 before:to-purple-500",
        headerStyle: "text-lg font-bold text-gray-800 mb-2 ml-6",
        statusStyle: "bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 text-sm font-medium",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      }
    };

    return variants[variantName] || variants.modern;
  };

  const styles = getVariantStyles(variant);

  const getMethodColor = (method: string) => {
    switch (method?.toUpperCase()) {
      case 'GET': return 'bg-green-100 text-green-800';
      case 'POST': return 'bg-blue-100 text-blue-800';
      case 'PUT': return 'bg-yellow-100 text-yellow-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      case 'PATCH': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'deprecated': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'maintenance': return <Shield className="h-4 w-4 text-blue-500" />;
      default: return <Globe className="h-4 w-4 text-gray-500" />;
    }
  };

  const mockApis = apis.length > 0 ? apis : [
    {
      id: 1,
      name: "User Management API",
      method: "GET",
      endpoint: "/api/v1/users",
      status: "Active",
      version: "v1.2.0",
      domain: "Authentication",
      description: "Manage user accounts and authentication"
    },
    {
      id: 2,
      name: "Product Catalog API",
      method: "POST",
      endpoint: "/api/v2/products",
      status: "Active",
      version: "v2.1.3",
      domain: "Catalog",
      description: "Product information and inventory management"
    },
    {
      id: 3,
      name: "Order Processing API",
      method: "PUT",
      endpoint: "/api/v1/orders",
      status: "Deprecated",
      version: "v1.0.5",
      domain: "Commerce",
      description: "Handle order creation and processing"
    },
    {
      id: 4,
      name: "Payment Gateway API",
      method: "DELETE",
      endpoint: "/api/v1/payments",
      status: "Maintenance",
      version: "v1.4.2",
      domain: "Payments",
      description: "Process payments and refunds"
    }
  ];

  return (
    <div className={styles.containerStyle}>
      {mockApis.map((api) => (
        <div key={api.id} className={styles.cardStyle}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Code className="h-5 w-5 text-gray-600" />
              <h3 className={styles.headerStyle}>{api.name}</h3>
            </div>
            <div className="flex items-center space-x-1">
              {getStatusIcon(api.status)}
            </div>
          </div>
          
          <div className="flex items-center space-x-2 mb-3">
            <Badge className={`${styles.statusStyle} ${getMethodColor(api.method)}`}>
              {api.method}
            </Badge>
            <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">
              {api.endpoint}
            </code>
          </div>
          
          <p className="text-sm text-gray-600 mb-3">{api.description}</p>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <span>Domain: {api.domain}</span>
              <span>Version: {api.version}</span>
            </div>
            <Badge 
              variant={api.status === 'Active' ? 'default' : api.status === 'Deprecated' ? 'destructive' : 'secondary'}
              className="text-xs"
            >
              {api.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
};
