'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, ChevronRight, ChevronDown, Menu, X, 
  BarChart3, Users, Upload, Play, Check, List, Shield, 
  FileText, LogOut, BookOpen, LayoutGrid 
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { supabase } from "@/lib/supabase";

interface EmployeeNavigationProps {
  user?: any;
  onLogout?: () => void;
  onCollapseChange?: (collapsed: boolean) => void; // Prop to sync layout
}

const EmployeeNavigation = ({ 
  user: providedUser,
  onLogout: providedOnLogout,
  onCollapseChange
}: EmployeeNavigationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user: authUser, logout } = useAuth();
  
  const [employee, setEmployee] = useState<any>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(true);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const displayUser = providedUser || employee;

  // Handle Logout
  const handleLogout = providedOnLogout || (async () => {
    await logout();
    router.push("/");
  });

  // Fetch Employee Data & Role
  useEffect(() => {
    if (!providedUser && authUser?.email) {
      const fetchEmployee = async () => {
        try {
          const { data: employeeData } = await supabase
            .from("users").select("*").eq("email", authUser.email).single();
          
          if (employeeData) {
            setEmployee(employeeData);
            const { data: roleData } = await supabase
              .from("user_role_assignments")
              .select(`roles!inner(name)`)
              .eq("user_id", employeeData.user_id)
              .eq("is_active", true);

            if (roleData) {
              const roles = roleData.map((ra: any) => ra.roles?.name);
              setIsAdmin(roles.some(r => ['ADMIN', 'SUPER_ADMIN', 'Admin'].includes(r)));
            }
          }
        } catch (e) { console.error(e); }
      };
      fetchEmployee();
    }
  }, [providedUser, authUser?.email]);

  // Sync Collapse State with Parent (Dashboard)
  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    if (onCollapseChange) onCollapseChange(newState);
  };

  // Keep a CSS variable in sync so parent layout can shift the main content
  // according to sidebar width. Values match Tailwind widths used above:
  // - collapsed: lg:w-20  => 5rem (but our previous layout used ~6rem; using 5rem feels tighter)
  // - expanded:  lg:w-[280px] => 280px (~17.5rem)
  // Use 6rem/18rem to match previous visual spacing and avoid overlap.
  useEffect(() => {
    try {
      if (isMobileOpen) {
        document.documentElement.style.setProperty('--sidebar-width', '0px');
      } else {
        document.documentElement.style.setProperty('--sidebar-width', isCollapsed ? '6rem' : '18rem');
      }
    } catch (e) {
      // ignore in non-browser environments
    }

    return () => {
      try { document.documentElement.style.removeProperty('--sidebar-width'); } catch (e) {}
    };
  }, [isCollapsed, isMobileOpen]);

  const isActive = (path: string) => pathname === path;

  // --- Tooltip Wrapper for Collapsed State ---
  const NavItem = ({ href, icon: Icon, label, active, isSubItem = false }: any) => (
    <div className="relative group">
      <Link 
        href={href || "#"} 
        className={`w-full flex items-center gap-3.5 transition-all duration-200 
          ${isSubItem ? 'py-2 px-2.5 rounded-lg ml-0' : 'px-4 py-3 rounded-[12px]'}
          ${active 
            ? 'bg-[#F5F8FF] text-[#3B66F5] font-bold' 
            : isSubItem ? 'text-[#64748B] hover:text-[#1E293B] hover:bg-slate-50' : 'text-[#1E293B] hover:bg-slate-50'
          }`}
      >
        <Icon size={isSubItem ? 18 : 20} strokeWidth={active ? 2.5 : 2} className="shrink-0" />
        {!isCollapsed && <span className={`${isSubItem ? 'text-[14px]' : 'text-[15px]'} truncate`}>{label}</span>}
      </Link>
      
      {isCollapsed && (
        <div className="absolute left-full ml-3 px-3 py-2 bg-[#1E293B] text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-[-10px] group-hover:translate-x-0 z-[100] whitespace-nowrap shadow-xl">
          {label}
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[#1E293B] rotate-45" />
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[45]" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="sm" onClick={() => setIsMobileOpen(!isMobileOpen)} className="bg-white shadow-md border-slate-200 w-10 h-10 p-0 rounded-lg">
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      <aside className={`fixed top-0 left-0 h-screen bg-white border-r border-slate-100 z-50 transition-all duration-300 ease-in-out flex flex-col
        ${isMobileOpen ? 'translate-x-0 w-[280px]' : '-translate-x-full lg:translate-x-0'} 
        ${isCollapsed ? 'lg:w-20' : 'lg:w-[280px]'}`}>
        
        {/* Sidebar Header */}
        <div className="p-6 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-visible cursor-pointer" onClick={() => router.push('/employee/welcome')}>
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform active:scale-95">
              {/* Simple "L" monogram to match the brand wordmark */}
              <svg className="w-5 h-5 text-[#3B66F5]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <rect x="6" y="4" width="3" height="14" fill="#3B66F5" rx="0.5" />
                <rect x="6" y="15" width="9" height="3" fill="#3B66F5" rx="0.5" />
              </svg>
            </div>
            {!isCollapsed && <span className="text-[21px] font-bold text-[#1E293B] tracking-tight">Lucid</span>}
          </div>
          <button onClick={toggleCollapse} className="hidden lg:block text-slate-400 hover:text-slate-600 transition-colors">
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Profile Card */}
        {!isCollapsed && (
          <div className="px-4 mb-4">
            <div className="flex items-center gap-3 p-3.5 rounded-[18px] border border-slate-50 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <div className="w-10 h-10 rounded-full bg-[#E0E9FF] flex items-center justify-center text-[#3B66F5] font-bold text-sm relative shrink-0">
                {displayUser?.name ? displayUser.name.split(' ').map((n:any)=>n[0]).join('').toUpperCase() : 'M'}
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#4ADE80] border-2 border-white rounded-full"></div>
              </div>
              <div className="overflow-hidden">
                <p className="text-[14px] font-bold text-[#1E293B] leading-tight truncate">{displayUser?.name || 'User'}</p>
                <p className="text-[11px] text-slate-500 truncate font-medium mt-0.5">{displayUser?.email}</p>
              </div>
            </div>
          </div>
        )}

        <nav className="flex-1 px-3 overflow-y-auto space-y-1 custom-scrollbar pt-2">
          <NavItem 
            href="/employee/welcome" 
            icon={LayoutGrid} 
            label="Home" 
            active={isActive('/employee/welcome')} 
          />

          {!isCollapsed && <div className="pt-6 pb-2 px-4 text-[10px] font-black text-[#1E293B] uppercase tracking-[0.2em] opacity-60">Learning Plan</div>}

          {/* Learning Plan Section */}
          <div className="relative group">
            <button 
              onClick={() => isCollapsed ? router.push('/employee/active') : setCoursesOpen(!coursesOpen)} 
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-[12px] transition-all duration-200 text-[#1E293B] hover:bg-slate-50`}
            >
              <div className="flex items-center gap-3.5">
                <BookOpen size={20} strokeWidth={2} className="shrink-0" />
                {!isCollapsed && <span className="text-[15px] font-medium">Learning Plan</span>}
              </div>
              {!isCollapsed && <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${coursesOpen ? '' : '-rotate-90'}`} />}
            </button>
            {isCollapsed && (
              <div className="absolute left-full ml-3 px-3 py-2 bg-[#1E293B] text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-[-10px] group-hover:translate-x-0 z-[100] whitespace-nowrap shadow-xl">
                Learning Plan
                <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[#1E293B] rotate-45" />
              </div>
            )}
            {coursesOpen && !isCollapsed && (
              <div className="ml-9 mt-1 space-y-0.5 border-l border-slate-100 pl-1">
                <NavItem href="/employee/active" icon={Play} label="Active Modules" active={isActive('/employee/active')} isSubItem />
                <NavItem href="/employee/completed" icon={Check} label="Completed" active={isActive('/employee/completed')} isSubItem />
                <NavItem href="/content-library" icon={List} label="All Modules" active={isActive('/content-library')} isSubItem />
              </div>
            )}
          </div>

          <NavItem 
            href="/employee/score-history" 
            icon={FileText} 
            label="Reports" 
            active={isActive('/employee/score-history')} 
          />

          {/* Admin Panel */}
          {isAdmin && (
            <>
              {!isCollapsed && <div className="pt-8 pb-2 px-4 text-[10px] font-black text-[#1E293B] uppercase tracking-[0.2em] opacity-60">Admin Panel</div>}
              <div className="relative group">
                <button 
                  onClick={() => isCollapsed ? router.push('/admin/dashboard/employees') : setAdminDropdownOpen(!adminDropdownOpen)} 
                  className="w-full flex items-center justify-between px-4 py-2.5 text-[#1E293B] hover:bg-slate-50 rounded-[12px] transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <Shield size={20} strokeWidth={2} className="shrink-0" />
                    {!isCollapsed && <span className="text-[15px] font-medium">Admin Panel</span>}
                  </div>
                  {!isCollapsed && <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${adminDropdownOpen ? '' : '-rotate-90'}`} />}
                </button>
                {isCollapsed && (
                  <div className="absolute left-full ml-3 px-3 py-2 bg-[#1E293B] text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-[-10px] group-hover:translate-x-0 z-[100] whitespace-nowrap shadow-xl">
                    Admin Panel
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[#1E293B] rotate-45" />
                  </div>
                )}
                {adminDropdownOpen && !isCollapsed && (
                  <div className="ml-9 mt-1 space-y-0.5 border-l border-slate-100 pl-1">
                    <NavItem href="/admin/dashboard/employees" icon={Users} label="Employees" active={isActive('/admin/dashboard/employees')} isSubItem />
                    <NavItem href="/admin/dashboard/analytics" icon={BarChart3} label="Analytics" active={isActive('/admin/dashboard/analytics')} isSubItem />
                    <NavItem href="/admin/dashboard/uploads" icon={Upload} label="Uploads" active={isActive('/admin/dashboard/uploads')} isSubItem />
                  </div>
                )}
              </div>
            </>
          )}
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-slate-50 mt-auto">
          <button onClick={handleLogout} className="relative group w-full flex items-center gap-3.5 px-4 py-3 text-[#EF4444] font-bold text-[15px] hover:bg-red-50 rounded-xl transition-all duration-200 group">
            <LogOut size={20} strokeWidth={2.5} className="shrink-0 group-hover:translate-x-0.5 transition-transform" />
            {!isCollapsed && <span>Log Out</span>}
            {isCollapsed && (
              <div className="absolute left-full ml-3 px-3 py-2 bg-[#EF4444] text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-[100] whitespace-nowrap shadow-xl">
                Log Out
                <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[#EF4444] rotate-45" />
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default EmployeeNavigation;