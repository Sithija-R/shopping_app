import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
 
  Alert,
} from "react-native";
// Create context
const AuthContext = createContext();

// Create AuthProvider to wrap around the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user data
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Store authentication status
  console.log("dd",user)
  // Load users list from AsyncStorage when the app loads
  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const storedUsers = await AsyncStorage.getItem("users");
        if (storedUsers) {
          const users = JSON.parse(storedUsers);
          
          const currentUser = users.find(user => user.email === user?.email);
          if (currentUser) {
            setUser(currentUser);
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Error loading users:", err);
      }
    };

    loadUserFromStorage();
  }, []);

  // Sign up function
  const signUp = async (email, password, name) => {
    try {
      const newUser = { email, password, name };
      const storedUsers = await AsyncStorage.getItem("users");
      let users = storedUsers ? JSON.parse(storedUsers) : [];
  
      // Check if user already exists
      const existingUser = users.find(user => user.email === email);
      if (existingUser) {
        // Alert if user already exists
        Alert.alert("Error", "User already exists");
        return; // Exit early
      }
  
      // Add new user to the list
      users.push(newUser);
      await AsyncStorage.setItem("users", JSON.stringify(users));
  
      // Set the user and authentication status
      setUser(newUser);
      setIsAuthenticated(true);
  
      // Alert for successful sign up
      Alert.alert("Success", "User registered successfully!");
    } catch (err) {
      console.error("Error during signup:", err);
      // Show error alert if something goes wrong
      Alert.alert("Error", "Failed to register user. Please try again.");
    }
  };
  

  // Login function
  const login = async (email, password) => {
    try {
      // Retrieve the users list from AsyncStorage
      const storedUsers = await AsyncStorage.getItem("users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      console.log("Users from AsyncStorage:", users); // Log the users list
  
      // Trim email and password to avoid issues with extra spaces
      const trimmedEmail = email.trim().toLowerCase(); // Convert email to lowercase
      const trimmedPassword = password.trim();
  
      // Check if email and password match any user (case insensitive for email)
      const user = users.find(user => user.email.toLowerCase() === trimmedEmail && user.password === trimmedPassword);
  
      console.log("Found user:", user); // Debugging log for the user object
  
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
        return { success: true, msg: "Logged in successfully" };
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (err) {
     
      throw new Error("Login error: " + err.message);
    }
  };
  

  // Logout function
  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signUp, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
