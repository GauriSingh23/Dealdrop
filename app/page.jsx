import { createClient } from "@/utils/supabase/server";
import { getProducts } from "./actions";
import { TrendingDown,LogIn ,Rabbit ,Shield, Bell} from "lucide-react"; // agar tum Lucide icons use kar rahe ho
import AddProductForm from "@/components/AddProductForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import AuthButton from "@/components/AuthButton";
import ThemeToggle from "@/components/ThemeToggle";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const products=user ? await getProducts() : [];

  const FEATURES = [
    {
      icon: Rabbit,
      title: "Lightning Fast",
      description:
        "Deal Drop extracts prices in seconds, handling JavaScript and dynamic content",
    },
    {
      icon: Shield,
      title: "Always Reliable",
      description:
        "Works across all major e-commerce sites with built-in anti-bot protection",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Get notified instantly when prices drop below your target",
    },
  ];

  return ( 
  <main className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-50 dark:from-orange-950/20 dark:via-background dark:to-orange-950/20">
    <header className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image src={"/deal-drop-logo.png"} alt="Deal Drop Logo"
            width={600}
           height={200}
           className="h-10 w-auto"
          />
      
        </div>

        {/* Auth Button */}
         <div className="flex items-center gap-2">
  <ThemeToggle />
  <AuthButton user={user} />
</div>
      </div>
    </header>
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">

        <h2 className="text-5xl font-bold text-foreground mb-4 tracking-tight">Never Miss a Price Drop</h2>

        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Track prices from any e-commerce site. Get instant alerts when
            prices drop. Save money effortlessly.
          </p>

          {/* Add Product Form */}
           <AddProductForm user={user} />
           {/* Features */}
           {products.length === 0 && (
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
              {FEATURES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="bg-card p-6 rounded-xl border border-border"
                >
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
              ))}
      </div>
      )}
      </div>
      </section>

       {/* Products Grid */}
      {user && products.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-foreground">
              Your Tracked Products
            </h3>
            <span className="text-sm text-muted-foreground">
              {products.length} {products.length === 1 ? "product" : "products"}
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 items-start">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}


       {/* Empty State */}
      {user && products.length === 0 && (
        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <div className="bg-card rounded-xl border-2 border-dashed border-border p-12">
            <TrendingDown className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No products yet
            </h3>
            <p className="text-muted-foreground">
              Add your first product above to start tracking prices!
            </p>
          </div>
        </section>
      )}
  </main>
);
}
