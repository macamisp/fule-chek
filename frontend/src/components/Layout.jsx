import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Car, Fuel, LogOut } from 'lucide-react';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const [active, setActive] = useState('dashboard');

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="text-white shadow-xl w-72 bg-dark bg-opacity-95 backdrop-blur-md">
                <div className="flex items-center justify-center p-6 border-b border-gray-700">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary">
                            <Fuel className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">Fuel<span className="text-primary">Chek</span></span>
                    </div>
                </div>

                <nav className="px-4 mt-8 space-y-2">
                    <p className="px-4 text-xs font-semibold tracking-wider text-gray-500 uppercase">Menu</p>
                    <a
                        href="/"
                        className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${active === 'dashboard'
                                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                            }`}
                        onClick={() => setActive('dashboard')}
                    >
                        <LayoutDashboard className={`w-5 h-5 mr-3 transition-colors ${active === 'dashboard' ? 'text-white' : 'text-gray-500 group-hover:text-white'}`} />
                        Dashboard
                    </a>

                    <div className="pt-8">
                        <p className="px-4 mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">Account</p>
                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-500 rounded-xl"
                        >
                            <LogOut className="w-5 h-5 mr-3" />
                            Sign Out
                        </button>
                    </div>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-8">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
