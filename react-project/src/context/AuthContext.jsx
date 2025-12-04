import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보 불러오기
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email, password) => {
    // 로컬 스토리지에서 사용자 목록 가져오기
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userWithoutPassword = { id: foundUser.id, email: foundUser.email, name: foundUser.name };
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return { success: true };
    }
    return { success: false, message: '이메일 또는 비밀번호가 올바르지 않습니다.' };
  };

  const signup = (email, password, name) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // 이메일 중복 체크
    if (users.find(u => u.email === email)) {
      return { success: false, message: '이미 존재하는 이메일입니다.' };
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    const userWithoutPassword = { id: newUser.id, email: newUser.email, name: newUser.name };
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateProfile = (name) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(u => 
      u.id === user.id ? { ...u, name } : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    const updatedUser = { ...user, name };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
