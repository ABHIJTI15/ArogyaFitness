import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar";
import { 
  Home, 
  Target, 
  Utensils, 
  Activity, 
  Crown,
  LogOut,
  Heart,
  User
} from "lucide-react";

interface AppSidebarProps {
  onLogout?: () => void;
  currentUser?: { name: string; email: string } | null;
}

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Habits",
    url: "/habits",
    icon: Target,
  },
  {
    title: "Nutrition",
    url: "/nutrition",
    icon: Utensils,
  },
  {
    title: "Activities",
    url: "/activities",
    icon: Activity,
  },
  {
    title: "Plans",
    url: "/plans",
    icon: Crown,
  },
];

export default function AppSidebar({ onLogout, currentUser }: AppSidebarProps) {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-accent font-bold text-lg">Arogya</h2>
            <p className="text-xs text-muted-foreground">Your Fitness Partner</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location === item.url}
                    data-testid={`nav-${item.title.toLowerCase()}`}
                  >
                    <Link href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 space-y-4">
        {/* User Profile */}
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-sidebar-accent">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{currentUser?.name || 'User'}</p>
            <p className="text-xs text-muted-foreground truncate">{currentUser?.email || 'user@example.com'}</p>
          </div>
        </div>

        {/* Logout Button */}
        <Button 
          variant="outline" 
          className="w-full"
          onClick={onLogout}
          data-testid="button-logout"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}